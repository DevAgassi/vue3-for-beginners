import { defineComponent, onMounted, reactive, ref } from "vue";
import TutorialDataService from "@/services/TutorialDataService";
import Tutorial from "@/types/Tutorial";
import ResponseData from "@/types/ResponseData";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "tutorial-details",
  setup() {
    const currentTutorial = reactive<Tutorial>({} as Tutorial);
    const message = ref<string>("");
    const router = useRouter();
    const route = useRoute();

    onMounted(() => {
      message.value = "";
      getTutorial(route.params.id);
    });

    function getTutorial(id: string | string[]) {
      TutorialDataService.get(id)
        .then((response: ResponseData) => {
          Object.assign(currentTutorial, response.data);
          console.log(response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
    function updatePublished(status: boolean) {
      const data = {
        id: currentTutorial.id,
        title: currentTutorial.title,
        description: currentTutorial.description,
        published: status,
      };
      TutorialDataService.update(currentTutorial.id, data)
        .then((response: ResponseData) => {
          console.log(response.data);
          currentTutorial.published = status;
          message.value = "The status was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
    function updateTutorial() {
      TutorialDataService.update(currentTutorial.id, currentTutorial)
        .then((response: ResponseData) => {
          console.log(response.data);
          message.value = "The tutorial was updated successfully!";
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
    function deleteTutorial() {
      TutorialDataService.delete(currentTutorial.id)
        .then((response: ResponseData) => {
          console.log(response.data);
          router.push({ name: "tutorials" });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }

    return {
      currentTutorial,
      message,
      router,
      route,
      updatePublished,
      updateTutorial,
      deleteTutorial,
    };
  },

  render() {
    return (
      <>
        {this.currentTutorial.id ? (
          <div class="edit-form">
            <h4>Tutorial</h4>
            <form>
              <div class="form-group">
                <label for="title">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  value={this.currentTutorial.title}
                />
              </div>
              <div class="form-group">
                <label for="description">Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="description"
                  value={this.currentTutorial.description}
                />
              </div>
              <div class="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {this.currentTutorial.published ? "Published" : "Pending"}
              </div>
            </form>
            {this.currentTutorial.published ? (
              <button
                class="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                v-else
                class="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}
            <button
              class="badge badge-danger mr-2"
              onClick={this.deleteTutorial}
            >
              Delete
            </button>
            <button
              type="submit"
              class="badge badge-success"
              onClick={this.updateTutorial}
            >
              Update
            </button>
            <p>{this.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </>
    );
  },
});

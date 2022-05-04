import { defineComponent, reactive, ref } from "vue";
import TutorialDataService from "@/services/TutorialDataService";
import Tutorial from "@/types/Tutorial";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "add-tutorial",
  async setup() {
    let tutorial = reactive<Tutorial>({
      id: null,
      title: "",
      description: "",
      published: false,
    });
    const submitted = ref<boolean>(false);

    function saveTutorial() {
      const data = {
        title: tutorial.title,
        description: tutorial.description,
      };
      TutorialDataService.create(data)
        .then((response: ResponseData) => {
          tutorial.id = response.data.id;
          console.log(response.data);
          submitted.value = true;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
    function newTutorial() {
      submitted.value = false;
      tutorial = {} as Tutorial;
    }

    return {
      tutorial,
      submitted,
      saveTutorial,
      newTutorial,
    };
  },

  render() {
    return (
      <>
        <div class="submit-form">
          {!this.submitted ? (
            <div class="w-50 flex flex-col">
              <div class="flex justify-between">
                <label for="title">Title</label>
                <input
                  type="text"
                  class="border-2 ml-2"
                  id="title"
                  required
                  value={this.tutorial.title}
                  name="title"
                />
              </div>
              <div class="flex justify-between">
                <label for="description">Description</label>
                <input
                  class="border-2 ml-2 mt-4 justify-self-center"
                  id="description"
                  required
                  value={this.tutorial.description}
                  name="description"
                />
              </div>
              <button
                onClick={this.saveTutorial}
                class="rounded-lg bg-blue-200 p-2 mt-5"
              >
                Submit
              </button>
            </div>
          ) : (
            <div>
              <h4>You submitted successfully!</h4>
              <button class="btn btn-success" onClick={this.newTutorial}>
                Add
              </button>
            </div>
          )}
        </div>
      </>
    );
  },
});

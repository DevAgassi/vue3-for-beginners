import { defineComponent, reactive, ref, onMounted } from "vue";
import TutorialDataService from "@/services/TutorialDataService";
import Tutorial from "@/types/Tutorial";
import ResponseData from "@/types/ResponseData";

export default defineComponent({
  name: "tutorials-list",
  async setup() {
    const tutorials = reactive<Tutorial[]>([] as Tutorial[]);
    const currentTutorial = ref<Tutorial>({} as Tutorial);
    const currentIndex = ref<number>(-1);
    const title = ref<string>("");

    onMounted(() => {
      retrieveTutorials();
    });

    function retrieveTutorials() {
      TutorialDataService.getAll()
        .then((response: ResponseData) => {
          Object.assign(tutorials, response.data);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
    function refreshList() {
      retrieveTutorials();
      currentTutorial.value = {} as Tutorial;
      currentIndex.value = -1;
    }
    function setActiveTutorial(tutorial: Tutorial, index = -1) {
      currentTutorial.value = tutorial;
      currentIndex.value = index;
    }
    function removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then((response: ResponseData) => {
          console.log(response.data);
          refreshList();
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
    function searchTitle() {
      TutorialDataService.findByTitle(title.value)
        .then((response: ResponseData) => {
          Object.assign(tutorials, response.data);
          setActiveTutorial({} as Tutorial);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }

    return {
      tutorials,
      currentTutorial,
      currentIndex,
      title,
      setActiveTutorial,
      removeAllTutorials,
      searchTitle,
    };
  },

  render() {
    return (
      <>
        <div class="list row">
          <div class="col-md-8">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Search by title"
                value={this.title}
              />
              <div class="input-group-append">
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <h4>Tutorials List</h4>
            <ul class="list-group">
              {this.tutorials.map((tutorial, index) => {
                return (
                  <li
                    onClick={() => this.setActiveTutorial(tutorial, index)}
                    class={
                      "list-group-item" +
                      (index === this.currentIndex && "active")
                    }
                    key={index}
                  >
                    {tutorial.title}
                  </li>
                );
              })}
            </ul>
            <button
              class="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllTutorials}
            >
              Remove All
            </button>
          </div>
          <div class="col-md-6">
            {this.currentTutorial.id ? (
              <div>
                <h4>Tutorial</h4>
                <div>
                  <label>
                    <strong>Title:</strong>
                  </label>{" "}
                  {this.currentTutorial.title}
                </div>
                <div>
                  <label>
                    <strong>Description:</strong>
                  </label>
                  {this.currentTutorial.description}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>
                  {this.currentTutorial.published ? "Published" : "Pending"}
                </div>
                <router-link
                  class="badge badge-warning"
                  to={"/tutorials/" + this.currentTutorial.id}
                  exact
                >
                  Edit
                </router-link>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Tutorial...</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  },
});

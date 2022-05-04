import http from "@/lib/http-bootsrap";

class TutorialDataService {
  getAll(): Promise<any> {
    //return http.get("/tutorials");
    return Promise.resolve({
      data: [
        {
          id: 1,
          title: "First Tutorial",
          description: "Welcome!!!!",
        },
        {
          id: 2,
          title: "Second Tutorial",
          description: "Hello!!!!",
        },
        {
          id: 3,
          title: "More Tutorial",
          description: "I'm not going to stop there",
        },
      ],
    });
  }
  get(id: any): Promise<any> {
    //return http.get(`/tutorials/${id}`);
    return Promise.resolve({
      data: [
        {
          id: 1,
          title: "First Tutorial",
          description: "Welcome!!!!",
        },
      ],
    });
  }
  create(data: any): Promise<any> {
    //return http.post("/tutorials", data);
    return Promise.resolve({
      data: {
        id: 1,
        title: data.title,
        description: data.description,
      },
    });
  }
  update(id: any, data: any): Promise<any> {
    return http.put(`/tutorials/${id}`, data);
  }
  delete(id: any): Promise<any> {
    return http.delete(`/tutorials/${id}`);
  }
  deleteAll(): Promise<any> {
    return http.delete(`/tutorials`);
  }
  findByTitle(title: string): Promise<any> {
    return http.get(`/tutorials?title=${title}`);
  }
}
export default new TutorialDataService();

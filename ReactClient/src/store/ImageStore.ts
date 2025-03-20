import { makeAutoObservable } from "mobx";
import apiClient from "../components/interceptor";



export type ImageType = {
  id: number;
  imageUrl: string;
  imageName: string;
  challengeId: number;
  votes: number;
}

class ImageStore {
  imageList: ImageType[] = [];
  constructor() {
    makeAutoObservable(this);
  }


  async getAllImages() {
   
    try {
      const response = await apiClient.get("/Image"); 
      // const response = await apiClient.get("/http://localhost:5131/api/Image"); 
      console.log("load images"+response.data);
      this.imageList = response.data;

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async getImageByChallengeId(challengeId: number) {

    // return (await axios.get(`http://localhost:5131/api/Image/${challengeId}`)).data;
    return (await apiClient.get(`Image/${challengeId}`)).data;
    // return (await apiClient.get(`http://localhost:5131/api/Image/${challengeId}`)).data;
  }

  async vote(challengeId:number|null, imageId: number,userId:string|null) {
    try {
      await apiClient.post(`/Vote`, { 
        UserId: userId,
        ChallengeId: challengeId,
        ImageId: imageId,
      });
  
      console.log(`Voted for image with id: ${imageId}`);
      this.getAllImages();
    } catch (error) {
      console.error("Error voting for image:", error);
      alert("You can vote only once for this image");
    }
}


}

export default new ImageStore();

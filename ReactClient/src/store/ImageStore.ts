import axios from "axios";
import { makeAutoObservable } from "mobx";



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
      const response = await axios.get("http://localhost:5131/api/Image");
      this.imageList = response.data;
      console.log("load images");
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }
  async getImageByChallengeId(challengeId: number) {

    return (await axios.get(`http://localhost:5131/api/Image/${challengeId}`)).data;
  }

  async vote(challengeId:number|null, imageId: number,userId:string|null) {
    try {
      await axios.post(`http://localhost:5131/api/Vote`, { 
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

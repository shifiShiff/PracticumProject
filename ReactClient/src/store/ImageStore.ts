import axios from "axios";
import { makeAutoObservable } from "mobx";
import { number } from "yup";



export type ImageType = {
    id: number;
    imageUrl: string;
    imageName: string;    
    challengeId: number;
}

class ImageStore {
    imageList:ImageType[] = []; 
	constructor() {
		makeAutoObservable(this);
	}


 async getAllImages() {
    try {
        const response = await axios.get("http://localhost:5131/api/Image");
        this.imageList= response.data;
        console.log("load images");        
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }
      async getImageByChallengeId(challengeId:number) {

        return (await axios.get(`http://localhost:5131/api/Image/${challengeId}`)).data;
      }


}

export default new ImageStore();

<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>User</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large"></ion-title>
        </ion-toolbar>
      </ion-header>

      <div style="padding: 15px">
        <h1 style="font-weight: bold; color:cornflowerblue;">User</h1>
        <img :src="this.user && this.user.profile_photo_url" style="border-radius:50%"/>
        <div style="padding:5px">
          <p>Name: {{ this.user && this.user.name}}</p>
          <p>Email: {{this.user && this.user.email}}</p>

        </div>
        <ion-button :disabled="this.clicked" @click="refresh">REFRESH</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import store from "@/store";
import axios from 'axios';

export default {
  name: 'User',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
  },
  data(){
    return{
      user: {},
      token: "",
      clicked: false
    }
  },
  async mounted () {
    this.user = await store.get('user')
    if(this.user.profile_photo_url == undefined){
      this.user.profile_photo_url = "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
    }
    this.token = await  store.get('token')
  },
  methods:{
    async refresh() {
      this.clicked = true
      console.log(this.token);
      const axiosClient = axios.create({
        baseURL: 'https://casteaching.tudorgoncear.me/api',
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.token
        }
      })
      var response = []
      try {
        response = await axiosClient.get('/user')
        this.user = response.data
        await store.set('user',response.data)
        console.log(this.user)
      } catch (error) {
        console.log(error);
      }
      this.clicked = false
    }
  }
}
</script>
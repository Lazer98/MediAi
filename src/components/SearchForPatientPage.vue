<template>

import SearchForPage from './SearchForPage.vue';
    <v-main class="mx-10">
   
       <!-- v-text field to search for a patient -->
  
        here show the fitting patient to click on 
        v-card @ click open the ProfilPatient.vue 

        <v-card @click="this.$router.push('/profil-patient/{id}');" >

          <SearchForPatient />

        </v-card>
  
    </v-main>
  </template>
  
  <script>
  export default {
    name: "SearchForPatientPage",
    components: { SearchForPage }
}
  </script>
  
  <style>/* Add any custom styles here */</style>
  
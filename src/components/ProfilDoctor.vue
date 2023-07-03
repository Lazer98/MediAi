<template>
    <v-main class="mx-10">
      <v-btn @click="this.$router.push('/search-for-patient');" 
      > Search For Patients</v-btn>
      <v-btn @click="this.$router.push('/messages-doctor');" 
      > Messages</v-btn>
  
  
  
    </v-main>
  </template>
  
  <script>
  export default {
    name: 'ProfilDoctor'
  }
  </script>
  
  <style>/* Add any custom styles here */</style>
  
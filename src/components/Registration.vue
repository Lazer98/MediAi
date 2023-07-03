<template>
  <v-main class="background">
      <v-container fluid fill-height>
        <v-row justify="center" align="center">
          <v-col >
            <v-card elevation="4" class="pa-6">

    <!-- DOCTOR FORM  LOGIN-->
    
        <v-form  v-if="choose === 'doctor' && login === 'login'" class="mt-8" cols="7" ref="form" v-model="valid" v-on:submit.prevent>
          <v-text-field :rules="emailRules" v-model="doctor.email" label="Email" type="email" required></v-text-field>
          <v-text-field :rules="IDRules" v-model="doctor.id" label="ID" type="ID" required></v-text-field>
          <v-btn type="submit" color="primary" @click="loginDoctor()" :disabled="!valid">Submit</v-btn>
        </v-form>
     

    <!-- PATIENT FORM  LOGIN-->

        <v-form v-if="choose === 'patient' && login === 'login'" class="mt-8" cols="7" ref="form" v-model="valid" v-on:submit.prevent>
          <v-text-field :rules="emailRules" v-model="patient.email" label="Email" type="email" required></v-text-field>
          <v-text-field :rules="passwordRules" v-model="patient.password" label="Password" required></v-text-field>
          <v-btn type="submit" color="primary" @click="loginPatient()" :disabled="!valid">Submit</v-btn>
        </v-form>

        <!-- SWITCH TO REGISTRATION -->
         <div class="mt-2" v-if="login === 'login'">
                <p class="text-body-2">Don't have an account yet? <br>
                  </p>
                  <p class="text-body-2" @click="login='registration'">Sign Up <br>
                  </p> 
            </div>

    <!-- DOCTOR FORM  REGISTRATION-->
    
        <v-form  v-if="choose === 'doctor' && login === 'registration'" class="mt-8" cols="7" ref="form" v-model="valid" v-on:submit.prevent>
          <v-text-field :rules="nameRules" v-model="doctor.name" label="Name" required></v-text-field>
          <v-text-field :rules="emailRules" v-model="doctor.email" label="Email" type="email" required></v-text-field>
          <v-text-field :rules="IDRules" v-model="doctor.id" label="Email" type="ID" required></v-text-field>
          <v-btn type="submit" color="primary" @click="postLogin()" :disabled="!valid">Submit</v-btn>
        </v-form>
     

    <!-- PATIENT FORM  REGISTRATION-->

        <v-form v-if="choose === 'patient' && login === 'registration'" class="mt-8" cols="7" ref="form" v-model="valid" v-on:submit.prevent>
          <v-text-field :rules="nameRules" v-model="patient.name" label="Name" required></v-text-field>
          <v-text-field :rules="emailRules" v-model="patient.email" label="Email" type="email" required></v-text-field>
          <v-text-field :rules="ageRules" v-model="patient.age" label="Age" required></v-text-field>
          <v-text-field :rules="birthdateRules" v-model="patient.birthdate" label="Birthdate" required></v-text-field>
          <v-text-field :rules="passwordRules" v-model="patient.password" label="Password" required></v-text-field>
          <v-btn type="submit" color="primary" @click="postPatient()" :disabled="!valid">Submit</v-btn>
        </v-form>

  <!-- SWITCH TO LOGIN -->
  <div class="mt-2" v-if="login === 'registration'">
                <p class="text-body-2">Already have an account? <br>
                  </p>
                  <p class="text-body-2" @click="login='login'">Sign In <br>
                  </p> 
            </div>

      </v-card>
          </v-col>
        </v-row>
        <v-row >
          <v-btn  class="btn" @click="choose = 'doctor'">
            Doctor
          </v-btn>
          <v-btn class="btn" @click="choose = 'patient'">
            patient
          </v-btn>
        </v-row>
      </v-container>






  </v-main>
</template>
 
<script>

import { mapMutations } from "vuex";


export default {
  name: 'RegistrationWord',
  data() {
    return {
      login:'login',
      choose: '',
      patient: {
        name: '',
        email: '',
        password:'',
        age: '',
        birthdate: ''

      },
      doctor: {
        name: '',
        email: '',
        id: ''

      },
      valid: false,
      nameRules: [
        v => !!v || 'Name is required',
        v => /^[a-zA-Z]+$/.test(v) || 'Name must not contain numbers or special characters',
        v => (v && v.length >= 2) || 'Name must be at least 2 characters long',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 2) || 'Password must be at least 2 characters long',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        v => (v && v !== 'patient@example.com') || 'E-mail must not be already in use',
      ],
      ageRules: [
        v => !!v || 'Age is required',
        v => /^\d+$/.test(v) || 'Age must be a number',
      ],
      birthdateRules: [
        v => !!v || 'Birthdate is required',
        v => /\d{4}-\d{2}-\d{2}/.test(v) || 'Invalid date format (YYYY-MM-DD)',
        v => {
          const birthdate = new Date(v);
          const today = new Date();
          return birthdate < today || 'Birthdate cannot be in the future';
        },
      ],
      IDRules: [
        v => !!v || 'ID is required',
        v => (v && v.length >= 3) || 'ID must be at least 3 letters long',
      ],
    }
  },
  methods: {
    ...mapMutations(["setAge", "setName", "setEmail", "setBirthdate","setId","setPassword"]),
    postPatient() {
      // axios.post("http://localhost:8085/patients",

      //   {
      //     "name": this.patient.name,
      //     "email": this.patient.email,
      //     "birthdate": this.patient.birthdate,
      //     "age": this.patient.age,
      // "password": this.patient.password
      //   }

      // ).then(response => {
      //   console.log(response);
      //   this.$router.push('/chat-bot');

      // });
      this.setName(this.patient.name);
      this.setAge(this.patient.age);
      this.setBirthdate(this.patient.birthdate);
      this.setEmail(this.patient.email);
      this.setPassword(this.patient.password);
      this.$router.push('/chat-bot');

    },
    postDoctor() {
      // axios.post("http://localhost:8085/doctors",

      //   {
      //     "name": this.doctor.name,
      //     "email": this.doctor.email,
      //     "id": this.doctor.id
      //   }

      // ).then(response => {
      //   console.log(response);
       //   this.$router.push('/profil-doctor');

      // });
      this.setName(this.doctor.name);
      this.setEmail(this.doctor.email);
      this.setId(this.doctor.id);
      this.$router.push('/profil-doctor');

    },
    loginPatient() {
      // axios.get("http://localhost:8085/patient",

      //   {
      //     "email": this.patient.email,
      //     "password": this.patient.password
      //   }

      // ).then(response => {
      //   console.log(response);
      //  this.patient=response.data;
      //   this.$router.push('/chat-bot');

      // });
      this.setName(this.patient.name);
      this.setAge(this.patient.age);
      this.setBirthdate(this.patient.birthdate);
      this.setEmail(this.patient.email);
      this.setPassword(this.patient.password);
      this.$router.push('/chat-bot');

    },
    loginDoctor() {
      // axios.post("http://localhost:8085/loginDoctor",

      //   {
      //     "email": this.doctor.email,
      //     "id": this.doctor.id
      //   }

      // ).then(response => {
      //   console.log(response);
      //  this.doctor=response.data;
      //   this.$router.push('/profil-doctor');

      // });
      this.setName(this.doctor.name);
      this.setId(this.doctor.id);
      this.setEmail(this.doctor.email);
      this.$router.push('/profil-doctor');

    },
    // generateToken() {
    //   // Perform authentication and get the patient's credentials
    //   const { email, password } = this;

    //   // Send the credentials to the server for authentication
    //   // On successful authentication, the server can generate a token

    //   // Assuming the server returns a token
    //   const secretKey = 'your-secret-key'; // Replace with your actual secret key
    //   const payload = { email,password }; // Include any additional data in the payload

    //   // Generate the token
    //   const token = jwt.sign(payload, secretKey);

    //   const tokenString = enc.Base64.stringify(enc.Utf8.parse(token));


    //   // Do something with the token, such as storing it in local storage or passing it to another component
    //   console.log(tokenString);
    //   this.setpatient(this.name);
    //   this.setToken(token);
    // },
  },
}
</script>
 
<style>
 .background{
  background-color:cornflowerblue
 }

</style>
 
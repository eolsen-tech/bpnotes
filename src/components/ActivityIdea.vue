<template>
    <div id="users">
        <h1>Activities</h1>
        <form v-on:submit="addActivity">
            <input type="text" v-model="newActivity.name" placeholder="enter activity">
            <input type="submit" value="Submit">
        </form>
        <ul>
            <li v-for="(activity,RowKey) in activities" v-bind:key="RowKey">
                <input type="checkbox" class="toggle" v-model="activity.contacted">
                <!-- give it a class of contacted if user is contacted-->
                <span :class="{contacted: activity.contacted}">
                    {{activity.Name}} --> {{activity.RowKey}}
                    <button v-on:click="deleteUser(activity)">x</button>"
                </span>
            </li>
        </ul>
        </div>
</template>

<script>
 
  /*import axios from 'axios' */ /* import is advised against using - use require instead (see below) */
  let axios = require('axios');  /* otherwise: ReferenceError: axios is not defined */



  export default {
    name: 'users',
    /* define data properties */
    data() {
        return {
          newActivity: {},
          activities: [
            {
                name: 'John Doe', 
                email: 'jdoe@email.com',
                contacted: false
            },
            {
                name: 'Jane Doe', 
                email: 'jadoe@email.com',
                contacted: false
            }
          ]
        }
    },
    methods: {
      addActivity: function(e){
          console.log('addActivity');
          let oNewActivity = {
              name: this.newActivity.name
          };
          let config = {
            headers: {
              'Content-Type': 'application/json', 
              'x-functions-key': 'WkIj289PLWj7CCvqP6fta/PY3c0jGPYtqlbFwPhazgjOBCSyoU5PDg=='
            },
            responseType: 'json'
          };
          let instance = axios.create(config);
          console.log('send POST - add activity');
          console.log(instance);
          let url = 'http://bpnotes-api.azurewebsites.net/api/HttpPOST-ActivityIdea';
          instance.post(url, oNewActivity).then((response) => {
            console.log('successful POST - add activity');
            this.users.push(oNewActivity);
            //e.preventDefault();
            console.log('updated activity list');
          }).catch(function (error) {
            console.log(error);
          });

      },
      deleteUser: function(user){
          console.log('deleteUser');
          console.log(user.name);
          console.log(this.users);
          this.users.splice(this.users.indexOf(user, 1));
          
      }
    },
    /* view.js has a set of lifecycle hooks - created, mounted, updated, and destroyed */
    created: function(){
        console.log('created ran');
      //axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
      //console.log(response.data)
      //this.users = response.data

        console.log('created ran');

  let config = {
    headers: {'Content-Type': 'application/json', 'x-functions-key': 'pWGoR5ApB3woNEvMha/f91fwbbnyOCJp3tb0aKR1pf1K2iG3SaFs9A=='},
    responseType: 'json'
  };
  let instance = axios.create(config);

//https://bpnotes-api.azurewebsites.net/api/HttpGET-ActivityIdea?code=pWGoR5ApB3woNEvMha/f91fwbbnyOCJp3tb0aKR1pf1K2iG3SaFs9A==
     instance.get('http://bpnotes-api.azurewebsites.net/api/HttpGET-ActivityIdea').then((response) => {
     console.log(response.data)
     this.activities = response.data
    })



   // })
    }
  }
</script>


<style scoped>
  .contacted {
      text-decoration: line-through 
  }
</style>

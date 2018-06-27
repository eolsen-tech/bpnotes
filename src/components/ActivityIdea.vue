<template>
  <div>
    <h1>Activities</h1>
    <form v-on:submit="addActivityIdea">
        <input type="text" v-model="newActivity.description" placeholder="enter description">
        <input type="text" v-model="newActivity.location" placeholder="enter location">
        <input type="submit" value="Submit">
    </form>
    <v-data-table
      :headers="headers"
      :items="activities"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.description }}</td>
        <td>{{ props.item.location }}</td>
      </template>
    </v-data-table>
  </div>
</template>



<script>
 
  /*import axios from 'axios' */ /* import is advised against using - use require instead (see below) */
  let axios = require('axios');  /* otherwise: ReferenceError: axios is not defined */

  const requestConfig = {
    httpPostActivityIdea: {
      baseURL : 'http://bpnotes-api.azurewebsites.net/api/',
      url: '/HttpPOST-ActivityIdea',
      headers: {
        'Content-Type': 'application/json', 
        'x-functions-key': 'WkIj289PLWj7CCvqP6fta/PY3c0jGPYtqlbFwPhazgjOBCSyoU5PDg=='
      },
      responseType: 'json'
    },
    httpGetActivityIdea: {
      baseURL : 'http://bpnotes-api.azurewebsites.net/api/',
      url: '/HttpGET-ActivityIdea',
      headers: {
        'Content-Type': 'application/json', 
        'x-functions-key': 'pWGoR5ApB3woNEvMha/f91fwbbnyOCJp3tb0aKR1pf1K2iG3SaFs9A=='
      },
      responseType: 'json'
    }
  }

  const HttpPostActivityIdea = { 
    config: {
            headers: {
              'Content-Type': 'application/json', 
              'x-functions-key': 'WkIj289PLWj7CCvqP6fta/PY3c0jGPYtqlbFwPhazgjOBCSyoU5PDg=='
            },
            responseType: 'json'
    },
    url : 'http://bpnotes-api.azurewebsites.net/api/HttpPOST-ActivityIdea'
  }

  export default {
    name: 'activityIdea',
    /* define data properties */
    data() {
        return {
          newActivity: {},

        headers: [
          {
            text: 'NAME',
            align: 'left',
            sortable: false,
            value: 'description'
          },
          { 
            text: 'LOCATION', 
            align: 'left',
            sortable: false,
            value: 'location' 
          }
          /*
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }*/
        ],
          activities: []
        }
    },
    methods: {
      addActivityIdea: function(e){
        let oNewActivity = {
          description: this.newActivity.description,
          location: this.newActivity.location
        };
        let instance = axios.create(requestConfig.httpPostActivityIdea);
        instance.post('/HttpPOST-ActivityIdea', oNewActivity).then((response) => {
          this.getActivityIdeas();
        }).catch(function (error) {
          console.log(error)
        });
      },
      deleteActivityIdea: function(activity){
        //this.activities.splice(this.activities.indexOf(activity, 1));
      },
      getActivityIdeas: function() {
        let instance = axios.create(requestConfig.httpGetActivityIdea);
        instance.get('/HttpGET-ActivityIdea').then((response) => {
        this.activities = response.data
      }).catch(function (error) {
        console.log(error);
      });
      }
    },
    /* fetches activity ideas list when the component is created. */
    created: function(){
      this.getActivityIdeas();
    }
  }
</script>

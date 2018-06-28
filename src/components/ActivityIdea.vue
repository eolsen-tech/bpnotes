<template>
  <div>
    <h1>Activities</h1>
    <!--In order for your application to work properly, you must wrap it in a v-app component -->
<v-app id="inspire">
  <div class="mx-auto bg-info" style="width: 400px;">
  <v-form ref="form" v-on:submit="addActivityIdea" v-model="valid" lazy-validation>
    <v-text-field
      v-model="newActivity.description"
      :rules="[v => !!v || 'Item is required']"
      label="Description"
      required
    ></v-text-field>

        <v-text-field
      v-model="newActivity.location"
      :rules="[v => !!v || 'Item is required']"
      label="Location"
      required
    ></v-text-field>

    <v-select
        v-model="newActivity.month"
        :items="months"
        :rules="[v => !!v || 'Item is required']"
        label="Month"
        required
    ></v-select>

    <v-btn
      :disabled="!valid"
      @click="submit"
    >
      submit
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
  </div>
    </v-app>
    <v-data-table
      :headers="headers"
      :items="activities"
      hide-actions
      class="elevation-1"
      sort-icon="arrow_drop_down"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.description }}</td>
        <td>{{ props.item.location }}</td>
        <td>{{ props.item.month }}</td>
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
    valid: true,

    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4'
    ],

        months: [
          'All',
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'August',
          'October',
          'November',
          'December'
        ],
        headers: [
          {
            text: 'NAME',
            align: 'left',
            //sortable: false,
            value: 'description'
          },
          { 
            text: 'Location', 
            align: 'left',
            sortable: true,
            value: 'location' 
          },
          { 
            text: 'MONTH', 
            align: 'left',
            //sortable: false,
            value: 'month' 
          }
        ],
          activities: []
        }
    },
    methods: {
      addActivityIdea: function(e){
        let oNewActivity = {
          description: this.newActivity.description,
          location: this.newActivity.location,
          month: this.newActivity.month
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
      },
      submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        this.addActivityIdea();
      }
      },
      clear () {
        this.$refs.form.reset()
      }
    },
    /* fetches activity ideas list when the component is created. */
    created: function(){
      this.getActivityIdeas();
    }
  }
</script>

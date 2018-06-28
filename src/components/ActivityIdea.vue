<template>
<v-app id="inspire">
  <div>
    <!-- Choosing an option immediately commits the option and closes the menu. 
        Touching outside of the dialog, or pressing Back, cancels the action and closes the dialog. -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.location" label="Location"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.month" label="Month"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-data-table
      :headers="headers"
      :items="activities"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.description }}</td>
        <td class="text-xs-right">{{ props.item.location }}</td>
        <td class="text-xs-right">{{ props.item.month }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="getActivityIdeas">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
  </v-app>
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
    httpPutActivityIdea: {
      baseURL : 'http://bpnotes-api.azurewebsites.net/api/',
      url: '/HttpPUT-ActivityIdea',
      headers: {
        'Content-Type': 'application/json', 
        'x-functions-key': 'IGaJ7F4aK9rky7a4h57hYVHgEXauw2CacjN11dWC2Sx5eyRhUSvolQ=='
      },
      responseType: 'json'
    },
    httpDeleteActivityIdea: {
      baseURL : 'http://bpnotes-api.azurewebsites.net/api/',
      url: '/HttpDELETE-ActivityIdea',
      headers: {
        'Content-Type': 'application/json', 
        'x-functions-key': 'HW2v1LrrdKax7EM1tLl/xbFBXJ1aKqaxpeampBOYnLBxj5GxvywJcQ=='
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
       dialog: false,
    valid: true,
    editedIndex: -1,
      editedItem: {
        description: '',
        month: '',
        location: ''
      },

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
            text: 'Description',
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
            text: 'Month', 
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
          description: this.editedItem.description,
          location: this.editedItem.location,
          month: this.editedItem.month
        };
        let instance = axios.create(requestConfig.httpPostActivityIdea);
        instance.post('/HttpPOST-ActivityIdea', oNewActivity).then((response) => {
          this.getActivityIdeas();
        }).catch(function (error) {
          console.log(error)
        });
      },
      updateActivityIdea: function(activityIdea){

        //this.editedIndex = this.activities.indexOf(activityIdea)
        this.editedItem = Object.assign({}, activityIdea)
        this.dialog = true

        let instance = axios.create(requestConfig.httpPutActivityIdea);
        instance.put('/HttpPUT-ActivityIdea', activityIdea).then((response) => {
          this.getActivityIdeas();
          //this.dialog = true
          this.close()
        }).catch(function (error) {
          console.log(error)
          //this.dialog = true
          this.close()
        });
      },
      deleteActivityIdea: function(activityIdea){
        let instance = axios.create(requestConfig.httpDeleteActivityIdea);
        instance.post('/HttpDELETE-ActivityIdea', activityIdea).then((response) => {
          this.getActivityIdeas();
        }).catch(function (error) {
          console.log(error)
        });
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
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {

        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$')
        console.log(this.editedItem);
        console.log(this.editedIndex);
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$')

        if (this.editedIndex > -1) {
          //Object.assign(this.activities[this.editedIndex], this.editedItem)
          this.updateActivityIdea(this.editedItem);
          console.log('save: -1');
        } else {
          //this.activities.push(this.editedItem)
          this.addActivityIdea(this.editedItem);
          console.log('save: else')
        }
        this.close()
      },

      editItem (item) {
        this.editedIndex = this.activities.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.activities.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.activities.splice(index, 1)
      },
    },
    /* fetches activity ideas list when the component is created. */
    created: function(){
      this.getActivityIdeas();
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    }
  }
</script>

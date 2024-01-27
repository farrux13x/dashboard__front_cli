<template>
    <div style="height: 100%; padding: 20px;">
        <el-dialog
            v-model="modalToggle"
            title="Customer"
            width="30%"
            destroy-on-close
            center
        >
            <el-form
                ref="formRef"
                :model="customerData"
                label-width="150px"
                class="demo-ruleForm"
            >
                <el-form-item
                label="Phone Number"
                prop="phoneNumber"
                :rules="[
                    { required: true, message: 'Phone Number is required' },
                    { type: 'number', message: 'Phone Number must be a number' },
                ]"
                >
                    <el-input
                        v-model.number="customerData.phoneNumber"
                        type="text"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item
                label="Price"
                prop="price"
                :rules="[
                    { required: true, message: 'price is required' },
                    { type: 'number', message: 'price must be a number' },
                ]"
                >
                    <el-input
                        v-model.number="customerData.price"
                        type="text"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item
                label="Name"
                prop="name"
                :rules="[
                    { required: true, message: 'Name is required' },
                ]"
                >
                    <el-input
                        v-model.number="customerData.name"
                        type="text"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item
                label="Address"
                prop="address"
                :rules="[
                    { required: true, message: 'Address is required' },
                ]"
                >
                    <el-input
                        v-model.number="customerData.address"
                        type="text"
                        autocomplete="off"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="modalToggle = false">Cancel</el-button>
                <el-button type="primary" @click="addCustomer()" v-if="!modalBtnChange">
                Add
                </el-button>
                <el-button type="primary" @click="updataCustomera()" v-else>
                Change
                </el-button>
            </span>
            </template>
        </el-dialog>
        <el-table :data="getCustomers" style="width: 100%">
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="price" label="Price" />
            <el-table-column prop="address" label="Address" />
            <el-table-column prop="phoneNumber" label="phoneNumber" />
            <el-table-column fixed="right" label="Operations">
                <template #header>
                    <el-input v-model="searchText" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                    <el-button type="primary" size="small" @click="updataCustomer(scope.row)">Edit</el-button>
                    <el-button type="danger" size="small">Detail</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="position: fixed; bottom: 50px; right: 50px;">
            <el-button type="success" size="large" @click="openModalAddCustomer()">+</el-button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data(){
        return{
            searchText:'',
            searchTime:'',
            modalToggle:false,
            modalBtnChange:false,
            customerData: {
                phoneNumber:null,
                price:null,
                address:null,
                name:null
            }
        }
    },
    methods:{
        ...mapActions([
            'apiCustomers',
            'apiAddCustomer',
            'apiUpdataCustomers',
            'apiSearchCustomers'
        ]),
        addCustomer() {
            this.apiAddCustomer(this.customerData)
            this.modalToggle = false
        },
        openModalAddCustomer(){
            this.customerData.phoneNumber = null,
            this.customerData.price = null,
            this.customerData.address = null,
            this.customerData.name = null

            this.modalBtnChange = false

            this.modalToggle = true
        },
        updataCustomer(id) {
            console.log(id);
            this.modalToggle = true
            this.modalBtnChange = true
            this.customerData = id
        },
        updataCustomera() {
            this.modalToggle = false
            // console.log(this.customerData);
            this.apiUpdataCustomers(this.customerData)
        }
    },
    computed:{
        ...mapGetters([
            'getCustomers'
        ])
    },
    watch:{
        searchText(){
            clearTimeout(this.searchTime)
            this.searchTime = setTimeout(()=> {
                this.apiSearchCustomers(this.searchText)
            },1000)
        }
    },
    mounted(){
        this.apiCustomers()
        // this.$store.dispatch('apiCustomers')
    }
}

</script>


<style>
    @import './styles/main.scss';
</style>
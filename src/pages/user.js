import React from "react"
import { Modal } from "bootstrap";
import axios from "axios";
import { baseUrl, authorization } from "../config.js"

class User extends React.Component{
    constructor(){
        super()
        this.state = {
            users: [
                {
                    id_user: "664", nama: "LuciDuck",
                    username: "lucigtgbgt",
                    password: "okeaja"
                },
                {
                    id_user: "665", nama: "Asmodeus",
                    username: "asmomo",
                    password: "mantapaja"
                },
                {
                    id_user: "666", nama: "Slilit",
                    username: "sliliten",
                    password: "enakaja"
                }
            ],
            role: "",
            visible: true
        }
        if (!localStorage.getItem("token")) {
            window .location.href = "/login"
        }
    }
    tambahData() {
        //memunculkan mmodal 
        this.modalUser = new Modal(document.getElementById("modal-user"))
        this.modalUser.show()

        //mengosongkan inputannya
        this.setState({
            nama: "", username: "", password: "", id_user: Math.random(1, 10000000), 
            action: "tambah"
        })
    }

    simpanData(event) {
        event.preventDefault()
        // mencegah berjalannya aksi default dari form submit

        //menghilangkan modal
        this.modalUser.hide()

        //cek aksi tambah atau ubah 
        if (this.state.action === "tambah") {
            let endpoint = "http://localhost:8000/users"
            //menampung data dari pengguna 
            let newUser = {
                id_user: this.state.id_user,
                nama: this.state.nama,
                username: this.state.username,
                password: this.state.password
            }

            // let temp = this.state.users
            // temp.push(newUser)

            // this.setState({ users: temp })
            axios.post(endpoint, newUser, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

        } else if (this.state.action === "ubah") {
            this.modalUser.hide()
            let endpoint = "http://localhost:8000/users" +
            this.state.id_user

            let newUser = {
                id_user: this.state.id_user,
                nama: this.state.nama,
                username: this.state.username,
                password: this.state.password
            }
            axios.put(endpoint, newUser, authorization)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))

            // mancari posisis index dari data user berdasarkan id user pada array 'users'
            // let index = this.state.users.findIndex(
            //     user => user.id_user === this.state.id_user
            // )

            // let temp = this.state.users
            // temp[index].nama = this.state.nama
            // temp[index].username = this.state.username
            // temp[index].password = this.state.password

            // this.setState({ users: temp })

        }
    }

    ubahData(id_user) {
        this.modalUser = new Modal(document.getElementById("modal-user"))
        this.modalUser.show()

        // mancari posisis index dari data user berdasarkan id user pada array 'users'
        let index = this.state.users.findIndex(
            user => user.id_user === id_user
        )

        this.setState({
            id_user: this.state.users[index].id_user,
            nama: this.state.users[index].nama,
            username: this.state.users[index].username,
            password: this.state.users[index].password,
            action: "ubah"

        })
    }
    hapusData(id_user) {
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            let endpoint = "http://localhost:8000/users" +
            id_user

            axios.delete(endpoint, authorization)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))
            
            //mecari posisi index dari data yang aan dihapus
            let temp = this.state.users
            let index = temp.findIndex(
                user => user.id_user === id_user
            )

            //menghapus data pada array
            temp.splice(index, 1)

            this.setState({ users: temp })
        }
    }
    getData() {
        let endpoint = "http://localhost:8000/users"
        axios.get(endpoint, authorization)
                .then(response => {
                    this.setState({ users: response.data })
                })
                .catch(error => console.log(error))
    }

    componentDidMount() {
        // fungsi ini dijalankan setelah fungsi render berjalan
        this.getData()
        let user = JSON.parse(localStorage.getItem("user"))
        if (user.role ==='admin') {
            this.setState({
                visible: true
            })
        } else {
            this.setState({
                visible: false
            })
        }
    }

    showAddButton(){
        if(this.state.role === 'admin' || this.state.role === 'kasir'){
            return (
                <button className="btn btn-success mx-3"
                onClick={() => this.tambahData()}>Tambah Paket</button>
            )
        }
    }

    render(){
        return(
            <div className="card">
                <div className="card-header bg-dark">
                    <h4 className="text-white">
                        List Daftar User
                    </h4>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {this.state.users.map(user => (
                            <li className="list-group-item">
                                <div className="row">
                                    {/* bagian untuk nama */}
                                    <div className="col-lg-5">
                                        <small className="text-info">Nama</small> <br />
                                        {user.nama} 
                                    </div>
                                    
                                    {/* bagian untuk gender */}
                                    <div className="col-lg-3">
                                        <small className="text-info">Username</small> <br />
                                        {user.username}
                                    </div>

                                    <div className="col-lg-2">
                                    <button className={`btn btn-warning btn-sm mx-3 ${this.state.visible ? ``: `d-none`}`}
                                        onClick={() => this.ubahData(user.id_user)}>
                                        Edit
                                    </button>
                                    <button className={`btn btn-danger btn-sm mx-3 ${this.state.visible ? ``: `d-none`}`}
                                        onClick={() => this.hapusData(user.id_user)}>
                                        Hapus
                                    </button>
                                    </div>

                                    {/* bagian untuk Telepon */}
                                    <div className="col-lg-4">
                                        <small className="text-info">ID User</small> <br />
                                        {user.id_user}
                                    </div>


                                    {/* bagian untuk alamat */}
                                    <div className="col-lg-12">
                                        <small className="text-info">Password</small> <br />
                                        {user.password}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="cd_grip gap-2 d-md-flex justify-content-md-end">
                    
                </div>

                {/* form modal user */}
                <div className="modal" id="modal-user">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-success">
                                <h4 className="text-white">
                                    Form User
                                </h4>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={ev => this.simpanData(ev)}>
                                    Nama
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.nama}
                                        onChange={ev => this.setState({ nama: ev.target.value })}
                                        required />

                                    username
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.username}
                                        onChange={ev => this.setState({ username: ev.target.value })}
                                        required />

                                    password
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.password}
                                        onChange={ev => this.setState({ password: ev.target.value })}
                                        required />

                                    <button className="btn btn-success btn-sm"
                                        type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default User
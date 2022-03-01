import React from "react"
import { Modal } from "bootstrap";
import axios from "axios";
import { formatNumber, authorization } from "../config";

class Paket extends React.Component{
    constructor(){
        super()
        this.state = {
            pakets: [
                {
                    id_paket: "121", jenis_paket: "Sandal",
                    harga: "15000"
                },
                {
                    id_paket: "122", jenis_paket: "Sepatu",
                    harga: "300000"
                },
                {
                    id_paket: "123", jenis_paket: "Kaos",
                    harga: "150000"
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
        this.modalPaket = new Modal(document.getElementById("modal-paket"))
        this.modalPaket.show()

        //mengosongkan inputannya
        this.setState({
            jenis_paket: "", harga: "", id_paket: Math.random(1, 10000000), 
            action: "tambah"
        })
    }
    simpanData(event) {
        event.preventDefault()
        // mencegah berjalannya aksi default dari form submit

        //menghilangkan modal
        this.modalPaket.hide()

        //cek aksi tambah atau ubah 
        if (this.state.action === "tambah") {
            let endpoint = "http://localhost:8000/paket"
            //menampung data dari pengguna 
            let newPaket = {
                id_paket: this.state.id_paket,
                jenis_paket: this.state.jenis_paket,
                harga: this.state.harga
            }

            // let temp = this.state.pakets
            // temp.push(newPaket)

            // this.setState({ pakets: temp })
            axios.post(endpoint, newPaket, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))

        } else if (this.state.action === "ubah") {
            this.modalPaket.hide()
            let endpoint = "http://localhost:8000/paket/" +
            this.state.id_paket

            let newPaket = {
                id_paket: this.state.id_paket,
                jenis_paket: this.state.jenis_paket,
                harga: this.state.harga
            }
            axios.put(endpoint, newPaket, authorization)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))

            // mancari posisis index dari data user berdasarkan id paket pada array 'pakets'
            // let index = this.state.pakets.findIndex(
            //     paket => paket.id_paket === this.state.id_paket
            // )

            // let temp = this.state.pakets
            // temp[index].jenis_paket = this.state.jnis_paket
            // temp[index].harga = this.state.harga

            // this.setState({ pakets: temp })

        }
    }
    ubahData(id_paket) {
        this.modalPaket = new Modal(document.getElementById("modal-paket"))
        this.modalPaket.show()

        // mancari posisis index dari data paket berdasarkan id paket pada array 'pakets'
        let index = this.state.pakets.findIndex(
            paket => paket.id_paket === id_paket
        )

        this.setState({
            id_paket: this.state.pakets[index].id_paket,
            jenis_paket: this.state.pakets[index].jenis_paket,
            harga: this.state.pakets[index].harga,
            action: "ubah"

        })
    }
    hapusData(id_paket) {
        if(window.confirm("Apakah anda yakin ingin menghapus data ini?")){
            let endpoint = "http://localhost:8000/paket/" +
            id_paket

            axios.delete(endpoint, authorization)
            .then(response => {
                window.alert(response.data.message)
                this.getData()
            })
            .catch(error => console.log(error))
            
            //mecari posisi index dari data yang aan dihapus
            let temp = this.state.pakets
            let index = temp.findIndex(
                paket => paket.id_paket === id_paket
            )

            //menghapus data pada array
            temp.splice(index, 1)

            this.setState({ pakets: temp })
        }
    }
    getData() {
        let endpoint = "http://localhost:8000/paket"
        axios.get(endpoint, authorization)
                .then(response => {
                    this.setState({ pakets: response.data })
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
                        List Daftar Paket
                    </h4>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {this.state.pakets.map(paket => (
                            <li className="list-group-item">
                                <div className="row">
                                    {/* bagian untuk nama */}
                                    <div className="col-lg-5">
                                        <small className="text-info">Jenis Paket</small> <br />
                                        {paket.jenis_paket} 
                                    </div>
                                    
                                    {/* bagian untuk gender */}
                                    <div className="col-lg-3">
                                        <small className="text-info">Harga</small> <br />
                                        {formatNumber(paket.harga)}
                                    </div>

                                    <div className="col-lg-2">
                                        <button className={`btn btn-warning btn-sm mx-3 ${this.state.visible ? ``: `d-none`}`}
                                            onClick={() => this.ubahData(paket.id_paket)}>
                                                Edit
                                            </button>
                                        <button className={`btn btn-danger btn-sm mx-3 ${this.state.visible ? ``: `d-none`}`}
                                            onClick={() => this.hapusData(paket.id_paket)}>
                                                Hapus
                                            </button>
                                    </div>

                                    {/* bagian untuk Telepon */}
                                    <div className="col-lg-4">
                                        <small className="text-info">ID Paket</small> <br />
                                        {paket.id_paket}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="cd_grip gap-2 d-md-flex justify-content-md-end">
                    
                </div>
                {/* form modal user */}
                <div className="modal" id="modal-paket">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-success">
                                <h4 className="text-white">
                                    Form paket
                                </h4>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={ev => this.simpanData(ev)}>
                                    Jenis Paket
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.jenis_paket}
                                        onChange={ev => this.setState({ jenis_paket: ev.target.value })}
                                        required />

                                    Harga
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.harga}
                                        onChange={ev => this.setState({ harga: ev.target.value })}
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

export default Paket
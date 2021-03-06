/**
 * 
 * Controller pagina criação de tickets.
 * 
 */

 // Utilitários & Módulos.
const Prototype = require('./../utils/Prototypes');
const Ticket    = require('./../modules/Ticket');
const Notification = require('./../utils/Notification');

export default class NewTicket {

    constructor(){

        Prototype.initElementsPrototypes();
        this.initEvents();
        this.getPriorities();
    }

    /**
     * Inicia os eventos do controller
     */
    initEvents(){

        document.querySelector("#btn-open-new-ticket").on('click', e=>{
            e.preventDefault();
            
            let frmNewTicket = document.querySelector('#form-open-new-ticket');
            
            if(frmNewTicket.validateFields()){
                
                // let frmData = new FormData(frmNewTicket);
                let body = frmNewTicket.getBody();

                let loadGif = document.createElement('img');
                loadGif.src="/public/rsc/img/dual-load.gif";
                loadGif.classList.add("button-load");

                e.target.innerHTML = "";
                e.target.appendChild(loadGif);

                Ticket.open(body).then(data=>{

                    frmNewTicket.clear();

                    Notification.pop('success', `Ticket #${data.id_ticket}`, `Ticket aberto, logo um técnico irá entrar em contato.`);
                    e.target.removeChild(loadGif);
                    e.target.innerHTML = "Enviar Ticket";
                    
                }).catch(error=>{
                    
                    Notification.pop('danger', `Error`, `${error.msg}`);

                    e.target.removeChild(loadGif);
                    e.target.innerHTML = "Enviar Ticket"
                    
                });



            }

        });

    }

    /**
     * Pega a lista de prioridade disponiveis para um ticket.
     */
    getPriorities(){

        Ticket.getPriorities().then(data=>{

            let select = document.querySelector("#ticket-priority");
            data.map(row=>{

                let option = document.createElement('option');
                option.value = row.id_priority;
                option.innerHTML = row.priority_name;
                
                select.appendChild(option);
            });



        }).catch(reject=>{

        });


    }

}
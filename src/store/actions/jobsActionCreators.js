import {GET_JOBS} from "../types";
import axios from 'axios';
import {FIREBASE_URL} from "../../utils/misc/misc";


export function getJobs() {

    const promise = new Promise((resolve, reject) => {

        axios({
            method: 'GET',
            url: `${FIREBASE_URL}/enterprises.json`
        }).then(response => {
            const enterprises = response.data;

            axios({
                method: 'GET',
                url: `${FIREBASE_URL}/offers.json`
            }).then(response => {
                const jobs = response.data;
                const responseData = {};

                for (let id in jobs) {
                    responseData[id] = {
                        ...jobs[id],
                        enterpriseData: enterprises[jobs[id].enterprise]
                    }
                }

                resolve(responseData)
            })
        }).catch(e => {
            console.log(e);
            reject(false)
        })
    });

    return {
        type: GET_JOBS,
        payload: promise
    };
}


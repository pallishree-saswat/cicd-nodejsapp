import axios from "axios"

// Get Contacts
export const getContact = async (userId) => {
    try {
      
        const res = await axios.get(`http://localhost:8000/api/contacts/${userId}`);
        console.log(res);
        return res.data;
    } catch (error) {
        console.log("error in get action", error)
    }
};

export const getOneContact = async (id) => {
    try {

        const res = await axios.get(`http://localhost:8000/api/auth/${id}`);
        return res.data;
    } catch (error) {
        console.log("error in get action", error)
    }
};

//  Add Contact
export const addContact = async (contact,userId) => {


    try {
        const res = await axios.post(`http://localhost:8000/api/contacts/${userId}`, contact);
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log("error in add action", error)

    }
};

// Update Contacts
export const updateContact = async (contact,id,userid) => {
    try {
        const res = await axios.put(`http://localhost:8000/api/contacts/${id}/edit/${userid}`, contact);
        console.log(res)
        return res.data

    } catch (error) {
        console.log("error in update", error);

    }

};


//  Delete Contact
export const deleteContact = async (id,userid) => {
    try {
      return  await axios.delete(`http://localhost:8000/api/contacts/${id}/${userid}`);

    } catch (error) {
        console.log("error in delete action", error)
    }

};

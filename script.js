async function saveToLocalStorage(event) {
    event.preventDefault();
    try {
      const experience = event.target.experience.value;
      const description = event.target.description.value;
      const category = event.target.category.value;
      const obj = { experience, description, category };
      let res = await axios.post(
        "https://crudcrud.com/api/5092b59ed9814a54908880102ded62e5/appointmentData",
        obj
      );
      if (res.status === 201) {
        showNewUserOnScreen(res.data);
      }
    } catch (error) {
      console.log();
    }
    // localStorage.setItem(obj.experience, JSON.stringify(obj))
    // showNewUserOnScreen(obj)
  }
  
  window.addEventListener("DOMContentLoaded", async () => {
    try {
      let res = await axios.get(
        "https://crudcrud.com/api/5092b59ed9814a54908880102ded62e5/appointmentData"
      );
      if (res.status === 200) {
        for (var i = 0; i < res.data.length; i++) {
          showNewUserOnScreen(res.data[i]);
        }
      }
    } catch (error) {
      console.log(error);
    }
    // const localStorageObj = localStorage
    // const localStorageKeys = Object.keys(localStorageObj)
    // for(let i=0; i<localStorageKeys.length; i++)
    // {
    //     const key = localStorageKeys[i]
    //     const userDetailsString = localStorageObj[key]
    //     const  userDetailsObj = JSON.parse(userDetailsString)
    //     showNewUserOnScreen(userDetailsObj)
    // }
  });
  
  function showNewUserOnScreen(user) {
    document.getElementById("experience").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").value = "";
    if (localStorage.getItem(user._id) !== null) {
      removeUserFromScreen(user.experience);
    }
    //const editDetails = [`${user._id}`, `${user.experience}`, `${user.description}`, `${user.category}`,]
    const parentNode = document.getElementById("userList");
    const childHTML = `<li id=${user._id}> ${user.experience} - ${user.description} 
      <button style="margin: 10px 2px; background: green; color:white" onclick=editUser('${user._id}','${user.experience}','${user.description}','${user.category}')>Edit</button>
      <button style="margin: 10px 2px" onclick=deleteUser('${user._id}')>Delete</button></li>`;
    parentNode.innerHTML = parentNode.innerHTML + childHTML;
  }
  
  // axios.put(`https://crudcrud.com/api/9bc94c1e99484d7ebd974aad3fa151c8/appointmentData/${userId}`)
  //     .then((res) => {
  
  //         editUser(userId, experience, description, category)
  //         console.log(res)
  //     }
  //     )
  //     .catch(err => console.log(err))
  async function editUser(userId, experience, description, category) {
    try {
      document.getElementById("experience").value = experience;
      document.getElementById("description").value = description;
      document.getElementById("category").value = category;
      const obj = { experience, description, category };
      let response = await axios.put(
        `https://crudcrud.com/api/5092b59ed9814a54908880102ded62e5/appointmentData/${userId}`,
        obj
      );
      if (response.status === 200) {
        console.log(userId);
        deleteUser(userId);
      }
    } catch (error) {
      console.log(error.response.data.error);
    }
  
    // document.getElementById('experience').value = experience;
    // document.getElementById('description').value = description;
    // document.getElementById('category').value = category;
    // deleteUser(userId)
  }
  
  async function deleteUser(obj) {
    try {
      let res = await axios.delete(
        `https://crudcrud.com/api/5092b59ed9814a54908880102ded62e5/appointmentData/${obj}`
      );
      //console.log(obj)
      if (res.status === 200) {
        removeUserFromScreen(obj);
      }
    } catch (error) {
      console.log(error.data);
    }
    // localStorage.removeItem(obj)
    // removeUserFromScreen(obj)
  }
  
  function removeUserFromScreen(obj) {
    //console.log(obj)
    const parentNode = document.getElementById("userList");
    const childNodeToBeDeleted = document.getElementById(obj);
    console.log(childNodeToBeDeleted, parentNode, obj);
    if (childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
    }
  }

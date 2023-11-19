// function for singup
function signUp(event) {
  event.preventDefault();
  //prevent page from refreshing
  const getSpin = document.querySelector(".spin");
  getSpin.style.display = "inline-block";

  // getting your values from the form

  const getName = document.getElementById("name").value;
  const getEmail = document.getElementById("email").value;
  const getPassword = document.getElementById("password").value;
  const getConfirmPassword = document.getElementById("confirmPassword").value;

  //checking for validation
  if (
    getName === "" ||
    getEmail === "" ||
    getPassword === "" ||
    getConfirmPassword === ""
  ) {
    Swal.fire({
      icon: "info",
      text: "All Fields are Required",
      confirmButtonColor: "#2D85DE",
    });
    getSpin.style.display = "none";
  }

  if (getConfirmPassword !== getPassword) {
    Swal.fire({
      icon: "info",
      text: "Password do not match",
      confirmButtonColor: "#2D85DE",
    });
    getSpin.style.display = "none";
  } else {
    // convert to form data
    const signData = new FormData();
    signData.append("name", getName);
    signData.append("email", getEmail);
    signData.append("password", getPassword);
    signData.append("password_confirmation", getConfirmPassword);

    const signMethod = {
      method: "POST",
      body: signData,
    };

    // create your url
    const url =
      "https://pluralcodesandbox.com/yorubalearning/api/register_admin";

    fetch(url, signMethod)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        if (result.status === "success") {
          Swal.fire({
            icon: "success",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });

          setTimeout(() => {
            location.href = "index.html";
          }, 3000);
        } else {
          Swal.fire({
            icon: "info",
            text: `${result.message}`,
            confirmButtonColor: "#2D85DE",
          });
          getSpin.style.display = "none";
        }
      })

      .catch((error) => console.log("error", error));
  }
}

//login function
function logIn(event) {
  event.preventDefault();
  //prevent page from refreshing
  const getSpin = document.querySelector(".spin");
  getSpin.style.display = "inline-block";

  // getting your values from the form

  const getEmail = document.getElementById("email").value;
  const getPassword = document.getElementById("password").value;

  if (getEmail === "" || getPassword === "") {
    Swal.fire({
      icon: "info",
      text: `${result.message}`,
      confirmButtonColor: "#2D85DE",
    });
    getSpin.style.display = "none";
  } else {
    const signData = new FormData();
    signData.append("email", getEmail);
    signData.append("password", getPassword);

    const signMethod = {
      method: "POST",
      body: signData,
    };

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";

    fetch(url, signMethod)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.setItem("admin", JSON.stringify(result));

        if (result.hasOwnProperty("email")) {
          location.href = "dashboard.html";
        } else {
          Swal.fire({
            icon: "info",
            text: "Login Unsuccessful",
            confirmButtonColor: "#2D85DE",
          });
          getSpin.style.display = "none";
        }
      })

      .catch((error) => console.log("error", error));
  }
}


// function to call a dashboard api
function getDashBoardApi() {
  const showName = document.getElementById("adminId");
  const showCategory = document.getElementById("category");
  const showLearn = document.getElementById("learnmat");
  const showSubCategory = document.getElementById("subCat");
  const showTotalQuiz = document.getElementById("quiz");
  const showStudent = document.getElementById("student");
  const getPageSpin = document.querySelector(".pagemodal");
  getPageSpin.style.display = "block";
  // get token from localstorage
  const myToken = localStorage.getItem("admin");
  const token = JSON.parse(myToken);
  const getToken = token.token;
 
  const dashHeader = new Headers();
  dashHeader.append("Authorization", `Bearer ${getToken}`);
  const dashMethod = {
    method: "GET",
    headers: dashHeader,
  };
  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";
  fetch(url, dashMethod)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      showName.innerHTML = `welcome ${result.admin_name}`;
      showCategory.innerHTML = `${result.total_number_of_categories}`;
      showLearn.innerHTML = `${result.total_number_of_learningmaterial}`;
      showSubCategory.innerHTML = `${result.total_number_of_subcategories}`;
      showTotalQuiz.innerHTML = `${result.total_number_of_quize}`;
      showStudent.innerHTML = `${result.total_number_of_students}`;
      getPageSpin.style.display = "none";
    })
    .catch((error) => console.log("error", error));
}



function studentModal(event) {
  event.preventDefault();
  const getThree = document.querySelector(".allstudent");
  const openModal = document.getElementById("dash-modal");
  openModal.style.display = "block";
  // get token from localstorage
  const myToken = localStorage.getItem("admin");
  const token = JSON.parse(myToken);
  const getToken = token.token;
  const dashHeader = new Headers();
  dashHeader.append("Authorization", `Bearer ${getToken}`);
  const dashMethod = {
    method: "GET",
    headers: dashHeader,
  };
  let data = [];
  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";
  fetch(url, dashMethod)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.length === 0) {
        getThree.innerHTML = "There are no top three at the moment!";
      } else {
        result.map((item) => {
          data += `
                  <div class="search-card">
                     <div class="d-flex justify-content-between">
                       <h5 class="mt-3">Image:</h5>
                       <img src=${item.image} alt="img" class="w-25">
                     </div>
                     <div class="d-flex justify-content-between">
                       <h5>Name:</h5>
                       <p>${item.name}</p>
                     </div>
                     <div class="d-flex justify-content-between">
                       <h5>Email:</h5>
                       <p>${item.email}</p>
                     </div>
                     <div class="d-flex justify-content-between">
                       <h5>Phone Number:</h5>
                       <p>${item.phone_number}</p>
                     </div>
                     <div class="d-flex justify-content-between">
                       <h5>Position:</h5>
                       <p>${item.position}</p>
                     </div>
                     <div class="d-flex justify-content-between">
                       <h5>Total Score:</h5>
                       <p>${item.total_score}</p>
                     </div>
                  </div>
                `;
          getThree.innerHTML = data;
        });
      }
    })
    .catch((error) => console.log("error", error));
}
function closeDashModal() {
  const openModal = document.getElementById("dash-modal");
  openModal.style.display = "none";
}

function getAllStudents() {
    const getTableBody = document.getElementById("table-id");
    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";
    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;
    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);
    const dashMethod = {
        method: 'GET',
        headers: dashHeader
    }
    let data = [];
    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/get_all_students";
    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.length === 0) {
            getTableBody.innerHTML = "No Records Found!";
            getSpin.style.display = "none";
        }
        else {
            result.map((item) => {
                data += `
                   <tr>
                      <td>${item.name}</td>
                      <td>${item.email}</td>
                      <td>${item.phone_number}</td>
                      <td>${item.position}</td>
                      <td>${item.total_score}</td>
                   </tr>
                `
                getTableBody.innerHTML = data;
                getSpin.style.display = "none";
            })
        }
    })
    .catch(error => console.log('error', error));
}



function createCategory(event) {

    event.preventDefault();
    
    const getSpin = document.querySelector(".spin");
    getSpin.style.display = "inline-block";

    const catName = document.getElementById("cat").value;
    const catImage = document.getElementById("imcat").files[0];

    if(catName === ""){
        Swal.fire({
            icon: "info",
            text: "All Fields are Required!",
            confirmButtonColor: "#2D85DE"
        })
        getSpin.style.display = "none";
    }
    else{
         
        const getToken = localStorage.getItem("admin");
        const myToken = JSON.parse(getToken);
        const token = myToken.token;

        dashHeader = new Headers();
        dashHeader.append ("Authorization",`Bearer ${token}`);

        const catData = new FormData();
        catData.append ("name", catName);
        catData.append ("image", catImage);

        const dashMethod ={
            method: 'POST',
            headers: dashHeader,
            body: catData
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/create_category";

        fetch(url, dashMethod)

        .then(response => response.json())
        .then(result => { 
            console.log(result)

            if(result.status === "success"){
                Swal.fire({
                    icon: "success",
                    text: `${result.message}`,
                    confirmButtonColor: "#2D85DE",
                })

                setTimeout(() => {
                    location.reload();
                }, 3000)

            }

            else{
                Swal.fire({
                    icon: "info",
                    text: `${result.message}`,
                    confirmButtonColor: "#2D85DE",
                })

            }
        })

        .catch(error => console.log('error', error));



    }

}

function getCategoryList(){

    const getSpin = document.querySelector(".pagemodal");
    getSpin.style.display = "block";

    const showItem = document.querySelector(".scroll-object");

    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token

    dashHeader = new Headers
    dashHeader.append("Authorization",`Bearer ${token}`);

    const dashMethod = {
        method: 'GET',
        headers: dashHeader
    }

    let data =[];

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/category_list";

    fetch(url, dashMethod)

    .then(response => response.json())
    .then(result => {
        console.log(result)

        if(result.length === 0) {

            showItem.innerHTML = "No category Found";

            getSpin.style.display = "none";

        }

        else{
            result.map((item) => {
                data += `
                <div class="search-card">
                   <a href = "details.html?name=${item.name}&id=${item.id}"> <img src=${item.image} alt="image"></a>
                    <p class="mt-3">${item.name}</p>

                    <div class="text-right">
                        <button class="update-button" onclick="modalBox(${item.id})">update</button>
                        <button class="delete-button" onclick="delCat(${item.id})">delete</button>
                    </div>
                </div>
                `
                showItem.innerHTML = data;
                getSpin.style.display = "none";
            })
        }
    })
    .catch(error => console.log('error', error));   

}


let globalId;

function modalBox(catId, name){
    globalId = catId
    console.log(name)

    const showModal = document.getElementById("my-modal3");
    showModal.style.display ="block";

    console.log(globalId)

    const getUpName = document.getElementById("updateName");

    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization",`Bearer ${token}`);

    const dashMethod = {
        method: 'GET',
        headers: dashHeader
    }

    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/get_details?category_id=${catId}`;

    fetch(url, dashMethod)

    .then(response => response.json())
    .then(result => {
        console.log(result)

        getUpName.setAttribute("value", `${result.name}`);

    })
    .catch(error => console.log('error', error));

}

function closeModal3() {
    const showModal = document.getElementById("my-modal3");
    showModal.style.display = "none"
}


function updateCategory(event){
    event.preventDefault();

    const getSpin = document.querySelector(".spin2");
    getSpin.style.display = "inline-block";

    const catName = document.getElementById("updateName").value;
    const catImage = document. getElementById("updateImage").files[0];

    if(catName === ""){

        Swal.fire({
            icon: "info",
            text: "All Fields are Required!",
            confirmButtonColor: "#2D85DE"
        })
        getSpin.style.display = "none";
    }

    else{
        const getToken = localStorage.getItem("admin");
        const myToken = JSON.parse (getToken);
        const token = myToken.token;

        const dashHeader = new Headers();
        dashHeader.append("Authorization",`Bearer ${token}`);

        const catData = new FormData();
        catData.append("name", catName);
        catData.append("image", catImage);
        catData.append("category_id", globalId)

        const dashMethod = {
            method: 'POST',
            headers: dashHeader,
            body: catData
        }

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/update_category";

        fetch(url, dashMethod)

        .then(response => response.json())
        .then(result => {
            console.log(result)

            if(result.status === "success"){

                Swal.fire({
                    icon: 'success',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })
                setTimeout(() => {
                    location.reload();
                }, 3000)
            }

            else{
                Swal.fire({
                    icon: 'info',
                    text: `${result.message}`,
                    confirmButtonColor: '#2D85DE'
                })

            }
        })


        .catch(error => console.log('error', error));

    }

}


function delCat(catId){
  
    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);
    const dashMethod = {
        method: 'GET',
        headers: dashHeader
    }

    const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/delete_category/${catId}`;

    fetch(url, dashMethod)
    .then(response => response.json())
    .then(result => {
        console.log(result)

        if (result.status === "success") {
            Swal.fire({
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: '#2D85DE'
            })
            setTimeout(() => {
                location.reload();
            }, 3000)
        }
        else {
            Swal.fire({
                icon: 'info',
                text: `${result.message}`,
                confirmButtonColor: '#2D85DE'
            })
        }
    })
    .catch(error => console.log('error', error));

}

function gotoLoginPage(event) {
  event.preventDefault();   
  location.href = "index.html";
}

function showCategoryName(){
  const params = new URLSearchParams(window.location.search);
  const showCatName = params.get('name');
  const myNameValue = document.querySelector(".det");
  myNameValue.innerHTML = showCatName;
}

function subCategory(event) {
  event.preventDefault();

  const params2 = new URLSearchParams(window.location.search);
  const showCatId = params2.get('id');

  const getSpin = document.querySelector(".spin");
  getSpin.style.display = "inline-block";

  const subCat = document.getElementById("subCatName").value;
  const subImg = document.getElementById("subCatImg").files[0];

  if(subCat === ""){
    Swal.fire({
      icon: 'info',
      text: 'All Fields Required!',
      confirmButtonColor: '#2D85DE'
  })
   getSpin.style.display = "none";
  }

  else{
    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization",`Bearer ${token}`);

    const catData = new FormData();
    catData.append("name",subCat);
    catData.append("image",subImg);
    catData.append("category_id",showCatId)

    const dashMethod = {
      method: 'POST',
      headers: dashHeader,
      body: catData
    }

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/create_subcategory";

    fetch(url,dashMethod)

    .then(response => response.json())
      
    .then(result => {
      console.log(result)

      if (result.status === "success") {
        Swal.fire({
            icon: 'success',
            text: `${result.message}`,
            confirmButtonColor: '#2D85DE'
        })
        setTimeout(() => {
            location.reload();
        }, 3000)
    }
    else {
        Swal.fire({
            icon: 'info',
            text: `${result.message}`,
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";
    }

    })
    .catch(error => console.log('error', error));

  }


}

function showCategoryDetails(){
  
  const params3 = new URLSearchParams(window.location.search);
  const showCatId = params3.get('id');

  const showRowItem = document.querySelector(".row");

  const getToken = localStorage.getItem("admin");
  const myToken = JSON.parse(getToken);
  const token = myToken.token;

  const dashHeader = new Headers();
  dashHeader.append("Authorization",`Bearer ${token}`);

  const delMethod = {
    method: 'GET',
    headers: dashHeader,
  }

  let data = [];

  const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/category_details/${showCatId}`;

  fetch (url,delMethod)
  .then(response => response.json())
  .then(result => {
    console.log(result)
    if (result.length === 0){
      showRowItem.innerHTML = "No subcategory found"
    }

    else{
      result.map((item) => {
        data += `
          <div class="col-sm-12 col-md-12 col-lg-4">

            <div class="search-card">
            <img src=${item.image} alt="image">
            <p class="mt-3">${item.name}</p>

            <div class="text-right">
            <button class="update-button" onclick="upSubCategory(${item.id})">update</button>

            </div>
            </div>
          </div>

        `
        showRowItem.innerHTML = data;
      })
    }

  })
  .catch(error => console.log('error', error));
}

let subGlobalId

function upSubCategory(subCatId){
  subGlobalId = subCatId
 

  const showModal = document.getElementById("my-modal-mode");
  showModal.style.display ="block";

  

  const getSubCatUpName = document.getElementById("updateSubName");

  const getToken = localStorage.getItem("admin");
  const myToken = JSON.parse(getToken);
  const token = myToken.token;

  const dashHeader = new Headers();
  dashHeader.append("Authorization",`Bearer ${token}`);

  const dashMethod = {
    method: 'GET',
    headers: dashHeader,
  }

  const url = `https://pluralcodesandbox.com/yorubalearning/api/admin/get_details?subcategory_id=${subCatId}`;

  fetch (url,dashMethod)

  .then(response => response.json())
  .then(result => {
    console.log(result)

    getSubCatUpName.setAttribute("value", `${result.name}`);


  })
  .catch(error => console.log('error', error));

}

function closeModalMode(){
  const showModal = document.getElementById("my-modal-mode");
  showModal.style.display = "none"
}


function updateSubCategory(event){
  event.preventDefault();

  const getSpin = document.querySelector(".spin2");
  getSpin.style.display = "inline-block";

  const subCatName = document.getElementById("updateSubName").value;
  const subCatImg = document.getElementById("updateSubImage").files[0];

  if(subCatName === ""){
    Swal.fire({
        icon: "info",
        text: "All Fields are Required!",
        confirmButtonColor: "#2D85DE"
    })
    getSpin.style.display = "none";
  }

  else{
    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization",`Bearer ${token}`);

    const subCatData = new FormData();
    subCatData.append("name",subCatName);
    subCatData.append("image",subCatImg);
    subCatData.append("subcategory_id", subGlobalId)

    const dashMethod = {
      method: 'POST',
      headers: dashHeader,
      body: subCatData
    }

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/update_subcategory";

    fetch(url,dashMethod)
    .then(response => response.json())
    .then(result => {
      console.log(result)

      if(result.status === "success"){

        Swal.fire({
            icon: 'success',
            text: `${result.message}`,
            confirmButtonColor: '#2D85DE'
        })
        setTimeout(() => {
            location.reload();
        }, 3000)
      }

    else{
        Swal.fire({
            icon: 'info',
            text: `${result.message}`,
            confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none";

    }
    
    })
    .catch(error => console.log('error', error));
  }
}


function upDateAdmin(event) {
  event.preventDefault();

  const getSpin = document.querySelector(".spin");
  getSpin.style.display = "inline-block";

  const getUpDateName = document.getElementById("updateName").value;
  const getUpDateEmail = document.getElementById("updateEmail").value;

  if(getUpDateName === "" || getUpDateEmail === ""){

    Swal.fire({
      icon: "info",
      text: "All Fields are Required!",
      confirmButtonColor: "#2D85DE"
    })
    getSpin.style.display = "none";
  }

  else{

    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization",`Bearer ${token}`);

    const signData = new FormData();
    signData.append("name", getUpDateName);
    signData.append("email", getUpDateEmail);

    const signMethod = {
      method: "POST",
      headers: dashHeader,
      body: signData,
    }

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_update_profile";

    fetch(url,signMethod)
    .then(response => response.text())
    .then(result => {
      console.log(result)

      if(result.status === "success"){
          Swal.fire({
            icon: 'success',
            text: `${result.message}`,
            confirmButtonColor: '#2D85DE'
        })
        setTimeout(() => {
          localStorage.clear();
          location.href ="index.html"
        }, 3000)
      }

      else{
        Swal.fire({
          icon: 'info',
          text: `${result.message}`,
          confirmButtonColor: '#2D85DE'
        })
        getSpin.style.display = "none"
      }
    })
    .catch(error => console.log('error', error));

  }

}


function upDatePassword(event){
  event.preventDefault();

  const getSpin = document.querySelector(".spin2")
  getSpin.style.display = "inline-block";

  const currentEmail = document.getElementById("updatePassEmail").value;
  const newPass = document.getElementById("updatePassword").value;
  const newConfirmPassword = document.getElementById("confirmPassword").value;

  if(currentEmail === "" || newPass === "" || newConfirmPassword === ""){
    Swal.fire({
      icon: "info",
      text: "All Fields are Required!",
      confirmButtonColor: "#2D85DE"
    })
    getSpin.style.display = "none";
  }

  if (newConfirmPassword !== newPass) {
    Swal.fire({
        icon: 'info',
        text: 'New password do not match',
        confirmButtonColor: '#2D85DE'
    })
    getSpin.style.display = "none";
}

  else{
    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;

    const dashHeader = new Headers();
    dashHeader.append("Authorization",`Bearer ${token}`);

    const signData = new FormData();
    signData.append("email", currentEmail);
    signData.append("password", newPass);
    signData.append("password_confirmation", newConfirmPassword);


    const signMethod = {
      method: "POST",
      headers: dashHeader,
      body: signData,
    }

    const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_update_password";

    fetch(url, signMethod)

    .then(response => response.json())
    .then(result => {
        console.log(result)
        if (result.status === "success") {
            Swal.fire({
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: '#2D85DE'
            })
            setTimeout(() => {
                localStorage.clear();
                location.href = "index.html"
            }, 3000)
        }
        else {
            Swal.fire({
                icon: 'info',
                text: `${result.message}`,
                confirmButtonColor: '#2D85DE'
            })
            getSpin.style.display = "none";
        }
    })
    .catch(error => console.log('error', error));
    
  }

}


function displayLearnModal() {
  const getModal = document.getElementById("my-modal");
  getModal.style.display = 'block';

}

function  closeModal2() {
  const showModal = document.getElementById("my-modal");
  showModal.style.display = "none" 
}

function reading() {
  const getDefault = document.querySelector(".myDefault");
  const getReading = document.querySelector(".myReading");
  const getCoversation = document.querySelector(".myConversation");

  const mydefault = document.querySelector(".default");
  const reading = document.querySelector(".reading");
  const conversation = document.querySelector(".conversation");

  

  getDefault.style.display = "none";
  getCoversation.style.display = "none";
  getReading.style.display = "block";

  mydefault.style.backgroundColor = "#fff";
  mydefault.style.border = "1px solid #2D85DE";
  mydefault.style.color = "#2D85DE";

  conversation.style.backgroundColor = "#fff";
  conversation.style.border = "1px solid #2D85DE";
  conversation.style.color = "#2D85DE";

  reading.style.backgroundColor = "#2D85DE";
  reading.style.color = "#fff";

}

function conversation() {
  const getDefault = document.querySelector(".myDefault");
  const getReading = document.querySelector(".myReading");
  const getCoversation = document.querySelector(".myConversation");

  const mydefault = document.querySelector(".default");
  const reading = document.querySelector(".reading");
  const conversation = document.querySelector(".conversation");

  

  getDefault.style.display = "none";
  getCoversation.style.display = "block";
  getReading.style.display = "none";

  mydefault.style.backgroundColor = "#fff";
  mydefault.style.border = "1px solid #2D85DE";
  mydefault.style.color = "#2D85DE";

  reading.style.backgroundColor = "#fff";
  reading.style.color = "#2D85DE";
  reading.style.border = "1px solid #2D85DE";


  conversation.style.color = "#fff";
  conversation.style.backgroundColor = "#2D85DE";

}

function defaultLearning() {
  const getDefault = document.querySelector(".myDefault");
  const getReading = document.querySelector(".myReading");
  const getCoversation = document.querySelector(".myConversation");

  const mydefault = document.querySelector(".default");
  const reading = document.querySelector(".reading");
  const conversation = document.querySelector(".conversation");

  

  getDefault.style.display = "block";
  getCoversation.style.display = "none";
  getReading.style.display = "none";

  conversation.style.backgroundColor = "#fff";
  conversation.style.border = "1px solid #2D85DE";
  conversation.style.color = "#2D85DE";

  reading.style.backgroundColor = "#fff";
  reading.style.color = "#2D85DE";
  reading.style.border = "1px solid #2D85DE";


  mydefault.style.color = "#fff";
  mydefault.style.backgroundColor = "#2D85DE";

}

function categoryDropdown() {
  const getCategoryDropdown = document.getElementById("nav-list")
  const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;
    const dashHeader = new Headers();
    dashHeader.append("Authorization", `Bearer ${token}`);
    const dashMethod = {
        method: 'GET',
        headers: dashHeader
    }
    let data = []

    fetch("https://pluralcodesandbox.com/yorubalearning/api/admin/categorylist_dropdown",dashMethod)
  .then(response => response.json())
  .then(result => {
    console.log(result)

    if(result.length === 0) {
      getCategoryDropdown.innerText = `
      No Category Found
      `
    }

    else{
      result.map((item)=>{
        data += `<h5>${item.parent_category.name}</h5>`
        item.sub_category.map((subItem)=>{
          data += `<p onclick="getSubId(${subItem.id})">${subItem.name}</p> <hr> `
        }) 
      })
    }
    getCategoryDropdown.innerHTML = data

  })
  .catch(error => console.log('error', error));


}

function getSubId (subId){
    Swal.fire({
      icon: "success",
      text: "Subcategory id selected",
      confirmButtonColor: "#2D85DE"
  })

  const getSubId = localStorage.setItem("matId",subId)
  const getMatId = localStorage.getItem("matId")

}

function createDefaultLearning(event) {
  event.preventDefault();

  const getSpin = document.querySelector(".spin");
  getSpin.style.display = "inline-block";

  const getTitle = document.getElementById("title").value;
  const getImage = document.getElementById("img1").files[0];
  const getAudio = document.getElementById("audio").files[0];

    if(getTitle === "" || getImage === "" || getAudio === "" ){
      Swal.fire({
          icon: "info",
          text: "All Fields are Required!",
          confirmButtonColor: "#2D85DE"
      })
      getSpin.style.display = "none";
    }

    else{

       const getToken = localStorage.getItem("admin");
       const myToken = JSON.parse(getToken);
       const token = myToken.token;

        dashHeader = new Headers();
        dashHeader.append ("Authorization",`Bearer ${token}`);

        const getMatId = localStorage.getItem("matId")

        const catData = new FormData();
        catData.append("title", getTitle);
        catData.append("image", getImage);
        catData.append("audio", getAudio);
        catData.append("subcategory_id", getMatId)

        const dashMethod = {
          method: 'POST',
          headers: dashHeader,
          body: catData
        };

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/create_defaultlearning";

        fetch (url, dashMethod)

        .then(response => response.json())
        .then(result => {
          console.log(result)

          if(result.status === "success"){

            Swal.fire({
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: '#2D85DE'
            })
            setTimeout(()=>{
              location.reload();
            },3000)
          }

          else{
            Swal.fire({
                icon: 'info',
                text: `${result.message}`,
                confirmButtonColor: '#2D85DE'
            })
          }

        })
        .catch(error => console.log('error', error));

        

    }

}

function createReadingMat(event){
  event.preventDefault();

  const getSpin = document.querySelector(".spin2");
  getSpin.style.display = "inline-block";

  const engText = document.getElementById("englishText").value;
  const youText = document.getElementById("yorubaText").value;
  const getImage = document.getElementById("img2").files[0];
  const getAudio = document.getElementById("audio2").files[0];

  if(engText === "" || youText === "" ||  getImage === "" || getAudio === "" ){

        Swal.fire({
          icon: "info",
          text: "All Fields are Required!",
          confirmButtonColor: "#2D85DE"
      })
      getSpin.style.display = "none";
    }

    else{
      const getToken = localStorage.getItem("admin");
      const myToken = JSON.parse(getToken);
      const token = myToken.token;

      const getMatId = localStorage.getItem("matId")

      dashHeader = new Headers();
        dashHeader.append ("Authorization",`Bearer ${token}`);

        const catData = new FormData();
        catData.append("words_in_english", engText);
        catData.append("words_in_yoruba", youText);
        catData.append("image", getImage);
        catData.append("audio", getAudio);
        catData.append("subcategory_id", getMatId)

        const dashMethod = {
          method: 'POST',
          headers: dashHeader,
          body: catData
        };
        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/create_readingmaterial";

        fetch(url, dashMethod)

        .then(response => response.json())
        .then(result => {
          console.log(result)
          
          if(result.status === "success"){

            Swal.fire({
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: '#2D85DE'
            })
            setTimeout(()=>{
              location.reload();
            },3000)
          }

          else{
            Swal.fire({
                icon: 'info',
                text: `${result.message}`,
                confirmButtonColor: '#2D85DE'
            })
          }
        })
        .catch(error => console.log('error', error));
    }

}



function createConversation(event){
  event.preventDefault();

  const getSpin = document.querySelector(".spin1");
  getSpin.style.display = "inline-block";

  const engQue = document.getElementById("englishQues").value;
  const youQue = document.getElementById("yorubaQues").value;
  const engAns = document.getElementById("englishAns").value;
  const youAns = document.getElementById("yorubaAns").value;
  const getAudio3 = document.getElementById("audio3").files[0];
  const getAudio4 = document.getElementById("audio4").files[0];
  const getImage3 = document.getElementById("img3").files[0];

  if(engQue === "" || youQue === "" ||  engAns === "" || youAns === "" || getAudio3 === ""|| getAudio4 === "" || getImage3 === ""){

        Swal.fire({
          icon: "info",
          text: "All Fields are Required!",
          confirmButtonColor: "#2D85DE"
      })
      getSpin.style.display = "none";
  }
  else{
    const getToken = localStorage.getItem("admin");
    const myToken = JSON.parse(getToken);
    const token = myToken.token;

    dashHeader = new Headers()
    dashHeader.append("Authorization",`Bearer ${token}`);

    const getMatId = localStorage.getItem("matId")

       const catData = new FormData();
        catData.append("conversation_english_question", engQue);
        catData.append("conversation_yoruba_question", youQue);
        catData.append("conversation_english_answer", engAns);
        catData.append("conversation_yoruba_answer", youAns);
        catData.append("conversation_audio_question_inyoruba", getAudio3);
        catData.append("conversation_audio_answer_inyoruba", getAudio4);
        catData.append("image", getImage3);
        catData.append("subcategory_id", getMatId)
    

        const dashMethod = {
          method: 'POST',
          headers: dashHeader,
          body: catData
        };

        const url = "https://pluralcodesandbox.com/yorubalearning/api/admin/create_learningconversation";


        fetch(url, dashMethod)

        .then(response => response.json())
        .then(result => {
          console.log(result)
          
          if(result.status === "success"){

            Swal.fire({
                icon: 'success',
                text: `${result.message}`,
                confirmButtonColor: '#2D85DE'
            })
            setTimeout(()=>{
              location.reload();
            },3000)
          }

          else{
            Swal.fire({
                icon: 'info',
                text: `${result.message}`,
                confirmButtonColor: '#2D85DE'
            })
          }
        })
        .catch(error => console.log('error', error));
    


  }


}

function logout() {
  localStorage.clear();
  location.href = "index.html";
}
 
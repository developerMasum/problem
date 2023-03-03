const loadPhone = () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAll(data.data.tools.slice(0, 6)));
};

const displayAll = (universes) => {
  const containerDiv = document.getElementById("card-container");
  containerDiv.innerHTML = "";
  universes.forEach((universe) => {
    //   console.log(universe);
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("col");

    const { image, name, published_in, id } = universe;

    cardDiv.innerHTML = `
        <div class="col">
                  <div class="card h-100">
                    <img src="${image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h2 class="card-title">Features</h2>
                      <p class="card-text"><ul>
                      <li>1.Natural language processing</li>
                      <li>2.Contextual understanding</li>
                      <li>3.Text generation</li>
                  </ul>
                  </p>
                    </div>
                    <div class="card-footer">
                     
                    <h2 class="">${name}</h2>
             <div class="d-flex justify-content-between">
               <div>
                 <p> <i class="fa-solid fa-calendar-days"></i> ${published_in} </p>
            </div>
                 <div>
            <i class="fa-solid fa-arrow-right" onclick="fetchDataDetail('${id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>

         </div>
                 </div>

                    </div>
                  </div>
                </div>
        `;

    containerDiv.appendChild(cardDiv);
  });
};

const showAllUniverses = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayAll(data.data.tools);
};

loadPhone();

// modal started from here **-------------

const fetchDataDetail = (ai_id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${ai_id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDataDetails(data.data));
  //    console.log(url);
};
const displayDataDetails = (details) => {
  console.log(details.input_output_examples[0]);
  // const title = document.getElementById('description');
  // title.innerText = details.description;

  const fullContainer = document.getElementById("container-all");
  // const div = document.createElement('div');
  // div.classList.add('d-flex text-center')
  fullContainer.innerHTML = `
  
  
  <div class="d-flex gap-2 justify-content-between mx-auto">
  <div class="col-col ">
    <div class="card">
      <div class="card-body">
       <div> <p> ${details.description}</p> </div>

       <div class="d-flex">
       <div class=" bg-light me-3 text-danger ">
         <p>${details.pricing[0].price}</p>
        </div> 
       <div class=" bg-light me-3 text-success ">
       <p>${details.pricing[1].price}</p>
        </div> 
       <div class=" bg-light me-3 text-warning  ">
       <p>${details.pricing[2].price}</p>
        </div> 

     </div>


     <div class="d-flex align-items-center justify-content-between">
     <div>
         <h3>Feature </h3>
         <ul>
             <li></li>
             <li>Lorem, ipsum dolor</li>
             <li>Lorem, ipsum dolor</li>
         </ul>
     </div>
     <div>
         <h3>Integration</h3>
         <ul>
             <li>${details.integrations[0]}</li>
             <li>${details.integrations[1]}</li>
             <li>${details.integrations[2]}</li>
         </ul>
     </div>
 
 
 
 </div>
       
      </div>
    </div>
  </div>
  <div class="col-col">
    <div class="card">
      <img src="${details.image_link ? details.image_link[0] : details.image_link[1] }" class="img-fluid w-100 "  alt="...">
      <div class="card-body">
        <h5 class="card-title">${details.input_output_examples[0].input}</h5>
        <p class="card-text">${details.input_output_examples[0].output}</p>
      </div>
    </div>
  </div>
  
 

  
  
  `;

};



  

fetchDataDetail();

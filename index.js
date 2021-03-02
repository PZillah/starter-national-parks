// Form Submissions module - creating submit handler to handle the submit event

///////// Form validation required before form gets submitted
// first write a validate function
function validateExists(value) {
  return value && value.trim();
}

function validateNumber(value) {
  return !isNaN(value);
}

function validateRange(value, min, max) {
  return value >= min && value <= max;
}

// second write the main validation function
function validateForm(formData) {
  const errors = {};

  // check if name was entered
  if (!validateExists(formData.get("name"))) {
    errors.name = "Please enter a name";
  }

  // check if rating was entered
  if (!validateExists(formData.get("rating"))) {
    errors.rating = "Please enter a rating";
  }

  // check if description was entered
  if (!validateExists(formData.get("description"))) {
    errors.description = "Please enter short description";
  }

  // check if established date was entered
  if (!validateExists(formData.get("established"))) {
    errors.established = "Please enter date";
  }

  // check if area was entered
  if (!validateExists(formData.get("area"))) {
    errors.area = "Please enter the area of the park";
  }

  // check if location date was entered
  if (!validateExists(formData.get("location"))) {
    errors.location = "Please enter the location of the park";
  }

  // check if rating was entered
  if (!validateExists(formData.get("rating"))) {
    errors.rating = "Please enter a rating";
  } else {
    //check if the rating is a number
    if (!validateNumber(formData.get("rating"))) {
      errors.rating = "Rating must be a number";
    } else {
      // since it is a number, convert it
      const rating = Number.parseFloat(formData.get("rating"));
      //check that the rating is between 1 and 5 inclusive
      if (!validateRange(rating, 1, 5)) {
        errors.rating = "Rating must be between 1 and 5 inclusive";
      }
    }
  }
  return errors;
}

// 1.create a submitHandler function
const submitHandler = (event) => {
  event.preventDefault();
  console.log("The form was submitted");
  // Get the name input. one way is using dot notation
  // const parkName = document.querySelector("#parkName").value;  // this ex doesn't work
  // console.log(parkName);
  // 2nd way is to instantiate a FormData object with the <form> element
  // then use get() method to get a specific value
  //const formData = new FormData(event.target);
  //const name = formData.get("name");
  //console.log(name);

  const form = event.target;
  const formData = new FormData(form);

  const errors = validateForm(formData);

  // clear all previous errors
  const errorElements = document.querySelectorAll(".error");
  for (let element of errorElements) {
    element.style.display = "none";
  }

  // display any new errors
  Object.keys(errors).forEach((key) => {
    // find the specific error element
    const errorElement = document.querySelector(`#park_${key} .error`);
    errorElement.innerHTML = errors[key];
    errorElement.style.display = "block";
  });

  // After validation, add new park element
  // if there are no errors
  if (!Object.keys(errors).length) {
    //create a new element
    const parkSection = document.createElement("section");

    // add the park class
    parkSection.classList.add("park");

    // construct the HTML for this element
    const content = `
      <h2>${formData.get("name")}</h2>
      <div class="location">${formData.get("location")}</div>
      <div class="description">${formData.get("description")}</div>
      <button class="rateBtn" title="Add to Favourites">&#9734;</button>
      <div class="stats">
        <div class="established stat">
          <h3>Established</h3>
          <div class="value">${moment(formData.get("established")).format(
            "MMMM D, YYYY"
          )}</div>
        </div>
        <div class="area stat">
          <h3>Area</h3>
          <div class="value">${formData.get("area")}</div>
        </div>
        <div class="rating stat">
          <h3>Rating</h3>
          <div class="value">${formData.get("rating")}</div>
        </div>
      </div>
      `;

    // set the innerHTML
    parkSection.innerHTML = content;

    //append to the main element
    document.querySelector("main").appendChild(parkSection);
  }
};

// 2.create the event listener for the form submission
const main = () => {
  // Get the form element
  const form = document.querySelector("#parkForm");

  // Attach the submit handler
  form.addEventListener("submit", submitHandler);
};

// 3.add event listener for DOMContentLoaded that invokes the main()
// steps 2 and 3 will be moved to bottom of page
window.addEventListener("DOMContentLoaded", main);

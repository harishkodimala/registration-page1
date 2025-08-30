const scriptURL = "https://script.google.com/macros/s/AKfycbw5XQO3nmxyLS9MIP2RWCwRwOhbYs5zXw4TAlXTXMfjiZ63q-I1DZ4d1rjePLv7dOtW/exec";

function handleSubmit(event) {
  event.preventDefault(); // stop normal form submit

  const form = document.forms["regForm"];
  const fname = form["fname"].value.trim();
  const lname = form["lname"].value.trim();
  const pw = form["pw"].value;
  const cp = form["cp"].value;
  const email = form["ename"].value.trim();
  const phone = form["phn"].value.trim();
  const terms = form["xx"].checked;

  // Validation
  if (fname === "") return alert("First name is required.");
  if (lname === "") return alert("Last name is required.");
  if (pw === "") return alert("Password is required.");
  if (pw !== cp) return alert("Passwords do not match.");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) return alert("Please enter a valid email address.");
  const phonePattern = /^\d{10}$/;
  if (!phonePattern.test(phone)) return alert("Please enter a valid 10-digit phone number.");
  if (!terms) return alert("You must agree to the terms and conditions.");

  // Collect Data
  const data = {
    fname,
    lname,
    pw,
    email,
    phone,
    gender: form["sex"].value,
    dob: form["dob"].value + "-" + form["dob1"].value + "-" + form["dob3"].value,
    address: form["add"].value,
    languages: Array.from(form.querySelectorAll('input[name="hb"]:checked')).map(el => el.value).join(", ")
  };

  // Send to Google Sheets
  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(() => alert("✅ Registration successful! A confirmation email has been sent."))
    .catch(() => alert("❌ Error submitting form. Please try again."));
}

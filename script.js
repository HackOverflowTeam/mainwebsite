// variables



document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// function signInUser(username, email) {
//   if (username && email) {
//       // Store username and email in local storage
//       localStorage.setItem("username", username);
//       localStorage.setItem("email", email);
      
//       // Call the function to handle what happens after signing in
//       handleUserSignin();
//   }
// }


// Hover effect on scroll down button
const scrollDown = document.querySelector('.scroll-down');
scrollDown.addEventListener('mouseenter', function() {
  scrollDown.style.transform = 'scale(1.1)';
});
scrollDown.addEventListener('mouseleave', function() {
  scrollDown.style.transform = 'scale(1)';
});


document.getElementById('contact-form').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Create the email body
  const emailBody = `You have received a new message from ${name} (${email}):\n\n${message}`;

  // Send the email using the /sendmail endpoint
  try {
    const response = await fetch('https://email-api-wz6l.onrender.com/sendmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'yadav.sourabh9012@gmail.com', // The recipient of the email
        subject: 'New Contact Form Submission',
        body: emailBody,
      }),
    });

    const data = await response.json();
    const formResponse = document.getElementById('form-response');

    if (response.ok) {
      formResponse.textContent = 'Your message has been sent successfully!';
      formResponse.style.color = 'green';
      // Clear the form fields
      document.getElementById('contact-form').reset();
    } else {
      formResponse.textContent = 'Failed to send message. Please try again later.';
      formResponse.style.color = 'red';
    }
  } catch (error) {
    document.getElementById('form-response').textContent = 'Error sending message.';
    document.getElementById('form-response').style.color = 'red';
  }
});


// Function to handle the user signin logic and update the UI


const otpForm = document.getElementById('otp-form');
const verifyForm = document.getElementById('verify-form');
const messageDiv = document.getElementById('message');

// Function to display a message
function showMessage(message, isSuccess = true) {
    messageDiv.textContent = message;
    messageDiv.style.color = isSuccess ? 'green' : 'red';
}

// Send OTP form handler


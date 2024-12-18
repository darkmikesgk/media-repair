document.getElementById('openModal').addEventListener('click', function() {
  document.getElementById('modal').style.display = 'block';
});

document.getElementById('callbackForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var name = document.getElementById("name").value;
  var phone = document.getElementById("phone").value;

  if (!name || !phone) {
      alert('Пожалуйста, заполните все поля.');
      return;
  }

  //const formData = new FormData(event.target);
  fetch('http://localhost:3000/send-email', {
      method: 'POST',
      //body: formData
      body: new URLSearchParams({
          name: name,
          phone: phone
      })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          alert('Заявка отправлена!');
      } else {
          alert('Ошибка при отправке заявки.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Ошибка при отправке заявки.');
  });
});

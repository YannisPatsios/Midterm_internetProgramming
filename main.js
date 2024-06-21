// Hamburger Navigation
$(document).ready(function(){
  $('.hm-menu').click(function(){
      $('header').toggleClass('h-100');
      $('.hm-menu span').toggleClass('hm-100');
      $('html').toggleClass('over-x');
  });
   $('header nav a').click(function(){
      $('header').removeClass('h-100');
      $('.hm-menu span').removeClass('hm-100');
       $('html').removeClass('over-x');
  });  
});

// Swiper JS for automatic carousel
var swiper = new Swiper("#swiper", {
  spaceBetween: 16,
  centeredSlides: false,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  }
});

// Index Table form
$(document).ready(function () {
  let items = [];
  let filteredItems = [];
  
  // Dark mode toggle
  $('#toggle-dark-mode').click(function () {
      $('body').toggleClass('dark-mode');
      // Save dark mode state to localStorage
      const isDarkMode = $('body').hasClass('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
  });

  // Check dark mode state on page load
  if (localStorage.getItem('darkMode') === 'true') {
      $('body').addClass('dark-mode');
  }

  // Add item
  $('#add-item-form').submit(function (e) {
      e.preventDefault();

      const itemName = $('#item-name').val().trim();
      const itemDescription = $('#item-description').val().trim();

      if (itemName && itemDescription) {
          const newItem = {
              name: itemName,
              description: itemDescription
          };
          items.push(newItem);
          filteredItems = items;
          renderTable(filteredItems);
          $('#item-name').val('');
          $('#item-description').val('');
      }
  });

  // Live Search
  $('#search').on('input', function () {
      const query = $(this).val().toLowerCase();
      filteredItems = items.filter(item => 
          item.name.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
      );
      renderTable(filteredItems);
  });

  // Render table
  function renderTable(itemsToRender) {
      const tbody = $('#items-table tbody');
      tbody.empty();

      itemsToRender.forEach((item, index) => {
          const row = $('<tr>').append(
              $('<td>').attr('contenteditable', 'true').text(item.name).on('blur', function () {
                  item.name = $(this).text();
              }),
              $('<td>').attr('contenteditable', 'true').text(item.description).on('blur', function () {
                  item.description = $(this).text();
              }),
              $('<td>').append(
                  // Delete Item
                  $('<button>').addClass('button').text('Delete').click(function () {
                      items.splice(items.indexOf(item), 1);  // Correctly remove item from the main items array
                      filteredItems = items.filter(filteredItem => 
                          filteredItem.name.toLowerCase().includes($('#search').val().toLowerCase()) ||
                          filteredItem.description.toLowerCase().includes($('#search').val().toLowerCase())
                      );
                      renderTable(filteredItems);
                  })
              )
          );
          tbody.append(row);
      });
  }

  // Sort items
  $('th').click(function () {
      const column = $(this).index();
      const order = $(this).hasClass('asc') ? 'desc' : 'asc';

      $(this).siblings().removeClass('asc desc');
      $(this).removeClass('asc desc').addClass(order);

      items.sort((a, b) => {
          let valueA = Object.values(a)[column];
          let valueB = Object.values(b)[column];
          
          if (order === 'asc') {
              return valueA > valueB ? 1 : -1;
          } else {
              return valueA < valueB ? 1 : -1;
          }
      });

      filteredItems = items.filter(item => 
          item.name.toLowerCase().includes($('#search').val().toLowerCase()) ||
          item.description.toLowerCase().includes($('#search').val().toLowerCase())
      );
      renderTable(filteredItems);
  });

  // Contact form submission
  $('#contact-form').on('submit', function(event) {
      event.preventDefault();
      const username = $('#username').val();
      const email = $('#email').val();
      const phone = $('#phone').val();
      const message = $('#message').val();
      alert(`Thank you for your request. We will get back to you soon!\nUsername: ${username}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`);
  });
});


//booking form
$(document).ready(function () {
  // Event listener for form submission
  $("#booking-form").submit(function (event) {
      event.preventDefault(); // Prevent form from submitting immediately

      // Get the check-in and check-out dates
      const checkinDate = new Date($("#checkin").val());
      const checkoutDate = new Date($("#checkout").val());

      // Get the user's name
      const userName = $("#name").val();

      // Validate dates
      if (checkoutDate <= checkinDate) {
          alert("Checkout date must be later than check-in date.");
      } else {
          // If validation passes, show success message
          const formattedCheckinDate = checkinDate.toLocaleDateString();
          const formattedCheckoutDate = checkoutDate.toLocaleDateString();
          alert(`Thank you ${userName}! Your reservation has been confirmed for the following dates: ${formattedCheckinDate} to ${formattedCheckoutDate}.`);
      }
  });
});









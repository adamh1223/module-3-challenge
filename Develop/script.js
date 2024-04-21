// Assignment code here

/* Add functionality to "All of the Above" input checkbox to select all options */
document.addEventListener('DOMContentLoaded', () => {
  var checkAll = document.getElementById('check-all');
  var checkboxes = document.querySelectorAll('.character-types input[type="checkbox"]');

  checkAll.addEventListener('change', function() {
      checkboxes.forEach(function(checkbox) {
          checkbox.checked = checkAll.checked;
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var lowercaseCheckbox = document.getElementById('includeLowercase');
  var uppercaseCheckbox = document.getElementById('includeUppercase');
  var numericCheckbox = document.getElementById('includeNumeric');
  var specialCharsCheckbox = document.getElementById('includeSpecialChars');
  var input = document.querySelector('.pwd-length');
  var generateButton = document.getElementById('generate');
  var passwordInfo = document.getElementById('password-info');

  generateButton.addEventListener('click', function() {
      var value = parseInt(input.value);
      if (isNaN(value)) {
          passwordInfo.textContent = 'Please enter a valid number.';
          return;
      } else if (value < 8) {
          passwordInfo.textContent = 'Your password must be at least 8 characters.';
          return;
      } else if (value > 128) {
          passwordInfo.textContent = 'Your password must not be longer than 128 characters.';
          return;
      } else {
          var password = generatePassword(value);
          passwordInfo.textContent = 'Your password is: ' + password;
      }
  });
  function generatePassword(length) {
    var charset = '';
    if (lowercaseCheckbox.checked) {
        charset += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (uppercaseCheckbox.checked) {
        charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (numericCheckbox.checked) {
        charset += '0123456789';
    }
    if (specialCharsCheckbox.checked) {
        charset += '!@#$%^&*()_+';
    }

    if (charset === '') {
        return 'Please select at least one character type.';
    }

    var password = '';
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
  }
});
// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

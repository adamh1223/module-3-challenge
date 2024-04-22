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
    var lowercaseSet = 'abcdefghijklmnopqrstuvwxyz';
    var uppercaseSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var numericSet = '0123456789';
    var specialSet = '!@#$%^&*()_+';
    var password = '';
    var counter = 0;

    if (lowercaseCheckbox.checked) {
        charset += lowercaseSet;
        var randomIndex = Math.floor(Math.random() * 26);
        password += lowercaseSet.charAt(randomIndex);
        counter++;
    }
    if (uppercaseCheckbox.checked) {
        charset += uppercaseSet;
        var randomIndex = Math.floor(Math.random() * 26);
        password += uppercaseSet.charAt(randomIndex);
        counter++;
    }
    if (numericCheckbox.checked) {
        charset += numericSet;
        var randomIndex = Math.floor(Math.random() * 10);
        password += numericSet.charAt(randomIndex);
        counter++;
    }
    if (specialCharsCheckbox.checked) {
        charset += specialSet;
        var randomIndex = Math.floor(Math.random() * 12);
        password += specialSet.charAt(randomIndex);
        counter++;
    }

    if (charset === '') {
        return 'Please select at least one character type.';
    }

    
    for (var i = counter; i < length; i++) {
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

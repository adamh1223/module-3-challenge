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
/*Create event listener and get checkboxes, password length input, generate button, and password info by ID so we can access them in JavaScript*/
document.addEventListener('DOMContentLoaded', function() {
  var lowercaseCheckbox = document.getElementById('includeLowercase');
  var uppercaseCheckbox = document.getElementById('includeUppercase');
  var numericCheckbox = document.getElementById('includeNumeric');
  var specialCharsCheckbox = document.getElementById('includeSpecialChars');
  var input = document.querySelector('.pwd-length');
  var generateButton = document.getElementById('generate');
  var passwordInfo = document.getElementById('password-info');

  /*Listen for click, if click happens with bad user input, display appropriate messages to the user*/
  /*Otherwise, display their password*/
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
  /*Create function to generate password, pass it length*/
  /*Create the charsets and the counter, set the password blank to start*/
  function generatePassword(length) {
    var charset = '';
    var lowercaseSet = 'abcdefghijklmnopqrstuvwxyz';
    var uppercaseSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var numericSet = '0123456789';
    var specialSet = '!@#$%^&*()_+';
    var password = '';
    var counter = 0;

    if (lowercaseCheckbox.checked) {
        /*Add lowercaseSet to the blank variable charset*/
        charset += lowercaseSet;
        /*Use Math.floor to ensure we don't get 27*/
        var randomIndex = Math.floor(Math.random() * 26);
        password += lowercaseSet.charAt(randomIndex);
        /*Starting counter at 0 and using counter++ will ensure that if this box is checked, lowercase will be the first character in the password. This guarantees that at least 1 lowercase character will be included in the password if this box is checked. This eliminates the possbility of the omission of any lowercase values due to randomness.*/
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
        /*Since there are only 10 values in numericSet, we multiply * 10 (not 26)*/
        var randomIndex = Math.floor(Math.random() * 10);
        password += numericSet.charAt(randomIndex);
        counter++;
    }
    if (specialCharsCheckbox.checked) {
        charset += specialSet;
        /*Since there are 12 values in numericSet, we multiply * 12*/
        var randomIndex = Math.floor(Math.random() * 12);
        password += specialSet.charAt(randomIndex);
        counter++;
    }
    /*This ensures at least one character type is selected, and returns a message if not*/
    if (charset === '') {
        return 'Please select at least one character type.';
    }

    /*Add a random string from charset (the collection of all the checked character sets) and multiply it by the selected length*/
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

// Add event listener to generate button, call the writePassword function
generateBtn.addEventListener("click", writePassword);

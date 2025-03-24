// Wait for the page to load
document.addEventListener("DOMContentLoaded", function() {
  
    
    const characterBar = document.getElementById("character-bar");
    
    // This will store all our characters
    let allCharacters = [];
    
    // Load characters from the server
    fetch("http://localhost:3000/characters")
      .then(response => response.json())
      .then(characters => {
        allCharacters = characters;
        
        // display each character in the bar
        characters.forEach(character => {
          // Create a clickable  name for each character
          const characterSpan = document.createElement("span");
          characterSpan.textContent = character.name;
          characterSpan.style.cursor = "pointer";
          characterBar.appendChild(characterSpan);
          
          // When a character name is clicked
          characterSpan.addEventListener("click", function() {
            // Show the character details
            document.getElementById("name").textContent = character.name;
            document.getElementById("image").src = character.image;
            document.getElementById("vote-count").textContent = character.votes;
            
            // Handle voting form
            const voteForm = document.getElementById("votes-form");
            
            // When form is submitted
            voteForm.onsubmit = function(e) {
              e.preventDefault();
              
              // Get the number of votes entered
              const votesInput = document.getElementById("votes");
              const newVotes = parseInt(votesInput.value);
              
              // Check if it's a real number
              if (!isNaN(newVotes)) {
                // Add the new votes to the total
                character.votes += newVotes;
                // Show the updated total
                document.getElementById("vote-count").textContent = character.votes;
                // Clear the input
                votesInput.value = "";
              } else {
                alert("Please enter a number!");
              }
            };
            
            // Handle reset button
            const resetBtn = document.getElementById("reset-btn");
            resetBtn.onclick = function(e) {
              e.preventDefault();
              // Setting  votes back to 0
              character.votes = 0;
              document.getElementById("vote-count").textContent = 0;
            };
          });
        });
        
        // Handle adding new characters
        const addForm = document.getElementById("character-form");
        addForm.onsubmit = function(e) {
          e.preventDefault();
          
          // Get the new character info
          const newName = document.getElementById("name2").value;
          const newImage = document.getElementById("image-url").value;
          
          // Creating a new character object
          const newCharacter = {
            id: allCharacters.length + 1,
            name: newName,
            image: newImage,
            votes: 0
          };
          
          // Adding to our list
          allCharacters.push(newCharacter);
          
          // Create a clickable name for the new character
          const newSpan = document.createElement("span");
          newSpan.textContent = newName;
          newSpan.style.cursor = "pointer";
          characterBar.appendChild(newSpan);
          
          // Clear the form
          addForm.reset();
        };
      });
  });
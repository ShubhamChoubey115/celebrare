
  document.getElementById('chooseBtn').addEventListener('change', function (event) {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      displayModal(selectedImage);
    }
  });

  function displayModal(image) {
    const modal = document.getElementById('imageModal');
    const modalContent = document.getElementById('modalContent');
    const selectedImageElement = document.getElementById('selectedImage');

    // Reset modal content
    modalContent.innerHTML = '';

    // Display selected image
    selectedImageElement.src = URL.createObjectURL(image);
    modalContent.appendChild(selectedImageElement);

    // Display close button
    const closeBtn = document.createElement('span');
    closeBtn.className = 'closeBtn';
    closeBtn.innerText = 'X';
    closeBtn.addEventListener('click', closeModal);
    modalContent.appendChild(closeBtn);

    // Display "Use this pic" button
    const useThisPicBtn = document.createElement('button');
    useThisPicBtn.id = 'useThisPicBtn';
    useThisPicBtn.innerText = 'Use this pic';
    useThisPicBtn.addEventListener('click', useThisPic);
    modalContent.appendChild(useThisPicBtn);

    // Display modes
    const modesContainer = document.createElement('div');
    modesContainer.innerHTML = '<p>Select Display Mode:</p>' +
    '<button class="modeBtn" onclick="applyMode(\'original\')">Original</button>' +
    '<button class="modeBtn" onclick="applyMode(\'square\')">' +
    '<img src="./asset/user_image_frame_2.png" alt="Square" width="15px" height="15px"></button>' +
    '<button class="modeBtn" onclick="applyMode(\'circle\')">' +
    '<img src="./asset/user_image_frame_3.png" alt="Circle" width="15px" height="15px"></button>' +
    '<button class="modeBtn" onclick="applyMode(\'rectangle\')">' +
    '<img src="./asset/user_image_frame_4.png" alt="Rectangle" width="40px" height="15px"></button>'+
    '<button class="modeBtn" onclick="applyMode(\'triangle\')">△</button>';
    modalContent.appendChild(modesContainer);

    // Display modal
    modal.style.display = 'block';
  }

  function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
  }

  function useThisPic() {
    const selectedImage = document.getElementById('selectedImage').src;
    // const modal = document.getElementById('imageModal');
    
    closeModal();
    
    // Display the selected picture below the "Choose Image" button
    const selectedImageContainer = document.createElement('div');
    selectedImageContainer.innerHTML = '<p>Selected Image:</p>' +
      '<img src="' + selectedImage + '" alt="Selected Image" width="400px" height="400px">';
    document.getElementById('container').appendChild(selectedImageContainer);
  }

  function applyMode(mode) {
    const selectedImageElement = document.getElementById('selectedImage');
    selectedImageElement.style.borderRadius = '0'; // Reset border radius

    switch (mode) {
      case 'square':
        // Apply square shape mode
        selectedImageElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
        selectedImage.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
        break;
      case 'circle':
        // Apply circle shape mode
        selectedImageElement.style.borderRadius = '50%';
        selectedImage.style.borderRadius = '50%';
        break;
      case 'rectangle':
        // Apply rectangle shape mode (4:3 aspect ratio)
        selectedImageElement.style.clipPath = 'polygon(0 0, 100% 0, 100% 75%, 0 75%)';
        selectedImage.style.clipPath = 'polygon(0 0, 100% 0, 100% 75%, 0 75%)';
        break;
      case 'triangle':
            // Apply triangle shape mode
            selectedImageElement.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
            break;
      // 'original' mode does not apply any changes
      default:
        selectedImageElement.style.clipPath = 'none';
    }
  }
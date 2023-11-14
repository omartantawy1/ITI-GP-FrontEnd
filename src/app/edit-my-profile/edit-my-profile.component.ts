import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-my-profile',
  templateUrl: './edit-my-profile.component.html',
  styleUrls: ['./edit-my-profile.component.css']
})
export class EditMyProfileComponent {


  originalFullName = 'Omar';
  fullName = this.originalFullName;
  isEditMode = false;

  enterEditMode() {
    this.isEditMode = true;
  }

  exitEditMode() {
    this.isEditMode = false;
  
    this.fullName = this.originalFullName;
  }

  saveChanges() {

    this.originalFullName = this.fullName;
    this.exitEditMode(); 
  }

  cancelEdit() {
    this.exitEditMode();
  }


/* Image */


imagePath = '../../assets/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg';
selectedFile: File | null = null;

onFileSelected(event: any): void {
  const fileInput = event.target;
  if (fileInput.files && fileInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePath = e.target.result;
      console.log('Selected image path:', this.imagePath);
    };
    reader.readAsDataURL(fileInput.files[0]);

    this.selectedFile = fileInput.files[0];
  }
}

onSubmit(): void {
  // Handle form submission here, e.g., send data to the server
  console.log('Form submitted:', this.selectedFile);
}

}

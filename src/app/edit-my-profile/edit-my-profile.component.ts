import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-my-profile',
  templateUrl: './edit-my-profile.component.html',
  styleUrls: ['./edit-my-profile.component.css']
})
export class EditMyProfileComponent {

  coverImageSrc: string = '../../assets/images/header.avif';
  profileImageSrc: string = 'https://bootdey.com/img/Content/user_6.jpg';

  editingFullName: boolean = false;
  editingPublicName: boolean = false;
  editingJobTitle: boolean = false;

  constructor() { }

  chooseCoverImage() {
    // Trigger the file input for choosing the cover image
    document.getElementById('cover-image')?.click();
  }

  chooseProfileImage() {
    // Trigger the file input for choosing the profile image
    document.getElementById('profile-image')?.click();
  }

  onCoverImageSelected(event: any) {
    // Handle the selected cover image here
    const coverImageFile = event.target.files[0];
    // Update the cover image source
    this.coverImageSrc = URL.createObjectURL(coverImageFile);
  }

  onProfileImageSelected(event: any) {
    // Handle the selected profile image here
    const profileImageFile = event.target.files[0];
    // Update the profile image source
    this.profileImageSrc = URL.createObjectURL(profileImageFile);
  }


}

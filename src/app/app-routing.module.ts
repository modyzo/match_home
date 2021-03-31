import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'login-phone',
    loadChildren: './pages/login-phone/login-phone.module#LoginPhonePageModule',
  },
  {
    path: 'login-phone-verification',
    loadChildren:
      './pages/login-phone-verification/login-phone-verification.module#LoginPhoneVerificationPageModule',
  },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfilePageModule',
  },
  {
    path: 'match-plus',
    loadChildren: './pages/match-plus/match-plus.module#MatchPlusPageModule',
  },
  { path: 'edit', loadChildren: './pages/edit/edit.module#EditPageModule' },
  {
    path: 'settings',
    loadChildren: './pages/settings/settings.module#SettingsPageModule',
  },
  { path: 'feed', loadChildren: './pages/feed/feed.module#FeedPageModule' },
  {
    path: 'autoplay-video',
    loadChildren:
      './pages/autoplay-video/autoplay-video.module#AutoplayVideoPageModule',
  },
  {
    path: 'email-verification',
    loadChildren:
      './pages/email-verification/email-verification.module#EmailVerificationPageModule',
  },
  {
    path: 'push-notification',
    loadChildren:
      './pages/push-notification/push-notification.module#PushNotificationPageModule',
  },
  {
    path: 'delete-account',
    loadChildren:
      './pages/delete-account/delete-account.module#DeleteAccountPageModule',
  },
  {
    path: 'delete-confirm',
    loadChildren:
      './pages/delete-confirm/delete-confirm.module#DeleteConfirmPageModule',
  },
  {
    path: 'profile-details',
    loadChildren:
      './pages/profile-details/profile-details.module#ProfileDetailsPageModule',
  },
  {
    path: 'phone-number',
    loadChildren:
      './pages/phone-number/phone-number.module#PhoneNumberPageModule',
  },
  {
    path: 'show-me',
    loadChildren: './pages/show-me/show-me.module#ShowMePageModule',
  },
  {
    path: 'add-media',
    loadChildren: './pages/add-media/add-media.module#AddMediaPageModule',
  },
  {
    path: 'account-recovery',
    loadChildren:
      './pages/account-recovery/account-recovery.module#AccountRecoveryPageModule',
  },
  {
    path: 'login-email',
    loadChildren: './pages/login-email/login-email.module#LoginEmailPageModule',
  },
  {
    path: 'team-match',
    loadChildren: './pages/team-match/team-match.module#TeamMatchPageModule',
  },
  {
    path: 'sign-up',
    loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule',
  },
  {
    path: 'verify/:token',
    loadChildren: './pages/verify/verify.module#VerifyPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

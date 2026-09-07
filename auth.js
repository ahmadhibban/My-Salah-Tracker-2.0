// ====== আপনার নিজস্ব গুগল ক্লাউড এবং ড্রাইভের তথ্য ======
const GOOGLE_API_KEY = 'AIzaSyDc-Zrm23BnSmeTDLW0_q87i0g4zRl7zNs'; 
const GOOGLE_CLIENT_ID = '777477778567-voctcaip869sal0csf385d78vntdb0qc.apps.googleusercontent.com'; 
const TEMPLATE_SHEET_ID = '1_TR1_lYoRhoM0v-d2lb-ZRorriHP0YtdPKYFtx_NnU8'; 
const REDIRECT_URI = 'https://ahmadhibban.github.io/My-Salah-Tracker-2.0/';
// ==========================================================

// অটো-সিঙ্ক ট্রিগার (সম্পূর্ণ সাইলেন্ট)
(function(){
    const originalSet = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        originalSet.apply(this, arguments);
        if(key === 'prayer_db') {
            clearTimeout(window.syncDbTimer);
            window.syncDbTimer = setTimeout(() => {
                window.dispatchEvent(new Event('auto-sync-db'));
            }, 2000);
        }
    };
})();

const AuthCSS = `<style>
.a-bg{background:linear-gradient(135deg,#FFF,#E8E8E8)} .a-bg-dark{background:linear-gradient(145deg,#F9F9F9,#E3E3E3)}
.a-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.65);backdrop-filter:blur(8px);display:flex;justify-content:center;align-items:center;z-index:99999;padding:15px;box-sizing:border-box;}
.a-card{position:relative;border-radius:22px;padding:26px;width:100%;max-width:320px;box-shadow:0 20px 45px rgba(0,0,0,0.35),inset 0 2px 5px #FFF;text-align:center;border:1.5px solid rgba(255,255,255,0.8);max-height:95vh;overflow-y:auto;margin:auto;}
.a-btn,.a-close{display:flex;justify-content:center;align-items:center;cursor:pointer;border:none;transition:0.1s}
.a-close{position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:10px;background:linear-gradient(135deg,#FFF,#DFDBD2);box-shadow:inset 2px 2px 3px #FFF,inset -1px -1px 2px rgba(0,0,0,0.05),1px 1px 0 #BCB4A4,2px 2px 0 #BCB4A4,3px 4px 6px rgba(0,0,0,0.12)}
.a-close:active{transform:scale(0.92);box-shadow:inset 2px 3px 5px rgba(0,0,0,0.15),inset -1px -1px 2px rgba(255,255,255,0.5)}
.a-circle{width:55px;height:55px;margin:0 auto 15px;border-radius:50%;display:flex;align-items:center;justify-content:center}
.a-c-def{background:rgba(0,0,0,0.05);box-shadow:inset 2px 3px 5px rgba(0,0,0,0.2),inset -1px -1px 3px #FFF}
.a-c-log{background:linear-gradient(135deg,#159C4C,#0F783A);box-shadow:inset 1px 2px 3px rgba(255,255,255,0.4),inset -2px -2px 4px rgba(0,0,0,0.3),0 3px 6px rgba(16,137,62,0.4)}
.a-c-dan{background:linear-gradient(135deg,#E74C3C,#B03A2E);box-shadow:inset 2px 2px 3px rgba(255,255,255,0.4),inset -2px -2px 4px rgba(0,0,0,0.2),1px 1px 0 #641E16,2px 2px 0 #641E16,4px 5px 10px rgba(0,0,0,0.3); color:#FFF; border-top:1px solid rgba(255,255,255,0.3); border-left:1px solid rgba(255,255,255,0.2)}
.a-title{color:#2D3748;margin:0 0 22px;font-size:24px;font-weight:900;font-family:'Outfit',sans-serif;text-shadow:1px 1px 0 #FFF,2px 3px 0 rgba(0,0,0,0.1),3px 5px 8px rgba(0,0,0,0.2);letter-spacing:0.5px}
.a-btn{width:100%;height:48px;border-radius:14px;font-weight:800;font-size:15px;font-family:'Plus Jakarta Sans',sans-serif;margin-bottom:12px;border-top:1px solid rgba(255,255,255,0.3);border-left:1px solid rgba(255,255,255,0.2)}
.a-btn-pri{background:linear-gradient(135deg,#4A89DF,#1A4B96);color:#FFF;box-shadow:inset 2px 2px 3px rgba(255,255,255,0.5),inset -2px -2px 4px rgba(0,0,0,0.2),1px 1px 0 #133366,2px 2px 0 #133366,4px 5px 10px rgba(0,0,0,0.3);text-shadow:1px 2px 2px rgba(0,0,0,0.5)}
.a-btn-sec{background:linear-gradient(135deg,#FFF,#D4D1C7);color:#444E51;box-shadow:inset 2px 3px 4px #FFF,inset -1px -1px 3px rgba(0,0,0,0.05),1px 1px 0 #BCB8A7,2px 2px 0 #BCB8A7,3px 3px 0 #BCB8A7,4px 5px 10px rgba(0,0,0,0.15);text-shadow:1px 1px 1px #FFF}
.a-btn:active{transform:scale(0.96)} .a-btn-sec:active{transform:translateY(3px) scale(0.98);box-shadow:inset 2px 3px 6px rgba(0,0,0,0.12),inset -2px -2px 4px rgba(255,255,255,0.8),0 0 0 #BCB8A7,1px 2px 4px rgba(0,0,0,0.1)}
.a-sync{border-radius:16px;padding:14px;margin-bottom:24px;box-shadow:inset 2px 2px 3px #FFF,inset -1px -1px 2px rgba(0,0,0,0.05),1px 1px 0 #C9C9C9,2px 2px 0 #C9C9C9,3px 4px 8px rgba(0,0,0,0.15);border-top:1px solid #FFF;border-left:1px solid #FFF}
</style>`;

const AuthHTML = `
<div x-show="isAuthModalOpen" class="a-overlay" style="display:none;" x-transition.opacity x-cloak>
  <div class="a-card a-bg-dark" @click.stop>
    
    <button type="button" class="a-close" @click="isAuthModalOpen=false" x-show="!isLogoutConfirmOpen && !isLoading">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6C7A80" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(1px 1px 0px #FFF)"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    
    <div x-show="!isLoggedIn">
      <div class="a-circle a-c-def"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C7A80" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg></div>
      <h3 class="a-title">Google Sync</h3>
      <p style="color:#6C7A80;font-size:13px;font-weight:700;margin-bottom:20px;">Connect your Google account to automatically create and sync trackers to your Drive.</p>
      
      <button type="button" class="a-btn a-btn-pri" @click.prevent="login()" style="display:flex;align-items:center;justify-content:center;gap:10px;">
         <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFF"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
         <span x-text="isLoading?'Connecting...':'Continue with Google'"></span>
      </button>
    </div>
    
    <div x-show="isLoggedIn && !isLogoutConfirmOpen">
      <div class="a-circle a-c-log"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
      <h3 class="a-title" style="margin-bottom:5px;" x-text="isLoading ? 'Connecting...' : 'Profile'"></h3>
      <p style="font-size:14px;font-weight:900;color:#4A5568;margin-bottom:22px;text-shadow:1px 1px 0 #FFF;letter-spacing:0.5px;" x-text="regEmail"></p>
      
      <div class="a-sync a-bg">
        <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:6px;">
          <div style="width:8px;height:8px;border-radius:50%;" :style="navigator.onLine?'background:#159C4C;box-shadow:0 0 5px #159C4C;':'background:#e74c3c;box-shadow:0 0 5px #e74c3c;'"></div>
          <span style="font-size:13px;font-weight:900;color:#4A5568;text-shadow:1px 1px 0 #FFF;" x-text="navigator.onLine?'Google Sheets Synced':'Offline Mode'"></span>
        </div>
        <p style="font-size:11px;font-weight:700;color:#8A9499;margin:0;text-shadow:1px 1px 0 #FFF;">
          Last Synced: <span x-text="isBackgroundSyncing ? 'Syncing...' : lastSyncTime"></span>
        </p>
      </div>
      
      <button type="button" class="a-btn a-c-dan" style="margin-bottom:0;" @click="isLogoutConfirmOpen=true;" x-show="!isLoading">Disconnect</button>
    </div>
    
    <div x-show="isLoggedIn && isLogoutConfirmOpen">
      <div class="a-circle a-c-dan" style="width:50px;height:50px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
      <h3 class="a-title" style="margin-bottom:8px;font-size:20px;">Disconnect?</h3>
      <p style="color:#6C7A80;font-size:13px;font-weight:700;margin:0 0 24px;line-height:1.4;">Your local app will stop syncing to Google Sheets.</p>
      <div style="display:flex;gap:10px;">
        <button type="button" class="a-btn a-btn-sec" style="margin:0;" @click="isLogoutConfirmOpen=false;">Cancel</button>
        <button type="button" class="a-btn a-c-dan" style="margin:0;" @click="logoutAccount()">Yes, Disconnect</button>
      </div>
    </div>
    
  </div>
</div>`;
document.addEventListener("DOMContentLoaded",()=>document.body.insertAdjacentHTML('beforeend',AuthCSS+AuthHTML));

window.getAuthLogic=()=>({
  isAuthModalOpen:!1, isLogoutConfirmOpen:!1, isLoggedIn:localStorage.getItem('isLoggedIn')==='true',
  regEmail:localStorage.getItem('regEmail')||'',
  userSheetId:localStorage.getItem('userSheetId')||null,
  accessToken:localStorage.getItem('g_token')||null,
  isLoading:!1, // শুধুমাত্র প্রথমবার লগইনের জন্য
  isBackgroundSyncing: !1, // ব্যাকগ্রাউন্ড সিঙ্কের জন্য
  lastSyncTime:localStorage.getItem('lastSyncTime')||'Never',
  
  initAuth(){
      const hash = window.location.hash.substring(1);
      const urlParams = new URLSearchParams(hash);
      let tokenFromUrl = urlParams.get('access_token');
      
      if (tokenFromUrl) {
          this.accessToken = tokenFromUrl;
          localStorage.setItem('g_token', this.accessToken);
          window.location.hash = ''; 
          this.isLoggedIn = true;
          localStorage.setItem('isLoggedIn', 'true');
          this.isAuthModalOpen = true; 
          this.isLoading = true;
      }

      const setupGAPI = async () => {
          try {
              if(!window.gapi) return setTimeout(setupGAPI, 500);
              await new Promise((resolve) => gapi.load('client', resolve));
              await gapi.client.init({
                  apiKey: GOOGLE_API_KEY,
                  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest', 'https://sheets.googleapis.com/$discovery/rest?version=v4']
              });
              if(this.accessToken) {
                  gapi.client.setToken({ access_token: this.accessToken });
                  if(tokenFromUrl) {
                      await this.fetchUserInfo();
                      await this.setupDriveSheet();
                      this.isAuthModalOpen = false;
                      this.isLoading = false;
                  }
              }
          } catch(e) { console.error("GAPI Init Error:", e); }
      };
      setupGAPI();
      
      window.addEventListener('online',()=>{if(this.isLoggedIn)this.forceCloudSync()});
      window.addEventListener('auto-sync-db',()=>{if(this.isLoggedIn)this.forceCloudSync()});
  },
  
  openAuthModal(){ this.isAuthModalOpen=true; this.isLogoutConfirmOpen=false; this.isLoading=false; },
  
  login(){
      this.isLoading = true;
      const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
      const params = {
          client_id: GOOGLE_CLIENT_ID,
          redirect_uri: REDIRECT_URI,
          response_type: 'token',
          // পুনরায় সেইফ পারমিশনে ফিরে গেলাম (drive.file)
          scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email',
          prompt: 'consent'
      };
      const queryString = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
      window.location.href = oauth2Endpoint + '?' + queryString; 
  },
  
  logoutAccount(){
      this.isLoggedIn=false; localStorage.setItem('isLoggedIn','false');
      localStorage.removeItem('g_token'); localStorage.removeItem('regEmail'); localStorage.removeItem('userSheetId');
      if(window.appRef) window.appRef.db={}; localStorage.removeItem('prayer_db');
      location.reload();
  },
  
  async fetchUserInfo(){
      try{
          let r = await fetch('https://www.googleapis.com/oauth2/v3/userinfo',{headers:{Authorization:`Bearer ${this.accessToken}`}});
          let d = await r.json();
          this.regEmail = d.email;
          localStorage.setItem('regEmail', this.regEmail);
      }catch(e){}
  },

  async setupDriveSheet(){
      try {
          let r = await gapi.client.drive.files.list({
              q: "name='মাসিক কাজা নামাজ ট্র্যাকার' and trashed=false",
              fields: "files(id, name)"
          });
          if(r.result.files && r.result.files.length > 0){
              this.userSheetId = r.result.files[0].id;
          } else {
              let copyReq = await gapi.client.drive.files.copy({
                  fileId: TEMPLATE_SHEET_ID,
                  resource: { name: 'মাসিক কাজা নামাজ ট্র্যাকার' }
              });
              this.userSheetId = copyReq.result.id;
          }
          localStorage.setItem('userSheetId', this.userSheetId);
          await this.forceCloudSync();
      } catch(e) {
          this.lastSyncTime = "Error: Please re-login";
          localStorage.setItem('lastSyncTime', this.lastSyncTime);
      }
  },
  
  async fetchCloudData(){},

  async forceCloudSync(){
      // যদি আগে থেকেই সিঙ্ক চলতে থাকে, তবে আবার রিকোয়েস্ট পাঠাবে না
      if(!navigator.onLine || !this.isLoggedIn || !this.userSheetId || !window.gapi || this.isBackgroundSyncing) return;
      
      this.isBackgroundSyncing = true; 
      try {
          let localDb = window.appRef ? window.appRef.db : JSON.parse(localStorage.getItem('prayer_db')||"{}");
          
          let meta = await gapi.client.sheets.spreadsheets.get({ spreadsheetId: this.userSheetId });
          let sheets = meta.result.sheets;
          let sheetNames = sheets.map(s => s.properties.title);
          let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

          for(const [dateStr, dayData] of Object.entries(localDb)){
              let d = new Date(dateStr);
              let targetSheetName = monthNames[d.getMonth()] + "-" + d.getFullYear(); 

              if(!sheetNames.includes(targetSheetName)){
                  let duplicateReq = {
                      requests: [{
                          duplicateSheet: {
                              sourceSheetId: sheets[0].properties.sheetId,
                              insertSheetIndex: sheets.length,
                              newSheetName: targetSheetName
                          }
                      }]
                  };
                  await gapi.client.sheets.spreadsheets.batchUpdate({
                      spreadsheetId: this.userSheetId,
                      resource: duplicateReq
                  });
                  sheetNames.push(targetSheetName);
              }

              // সঠিক Row-তে ডেটা বসানোর লজিক (Date + 6)
              let row = d.getDate() + 6; 
              let updates = [];
              
              // চেকবক্সের জন্য TRUE/FALSE বুলিয়ান কোড
              updates.push({ range: `${targetSheetName}!B${row}`, values: [[ dayData.core.fajr ? true : false ]] });
              updates.push({ range: `${targetSheetName}!C${row}`, values: [[ dayData.core.dhuhr ? true : false ]] });
              updates.push({ range: `${targetSheetName}!D${row}`, values: [[ dayData.core.asr ? true : false ]] });
              updates.push({ range: `${targetSheetName}!E${row}`, values: [[ dayData.core.maghrib ? true : false ]] });
              updates.push({ range: `${targetSheetName}!F${row}`, values: [[ dayData.core.isha ? true : false ]] });

              if(updates.length > 0){
                  let valueRanges = updates.map(u => ({ range: u.range, values: u.values }));
                  await gapi.client.sheets.spreadsheets.values.batchUpdate({
                      spreadsheetId: this.userSheetId,
                      resource: { valueInputOption: "USER_ENTERED", data: valueRanges }
                  });
              }
          }
          
          this.lastSyncTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          localStorage.setItem('lastSyncTime', this.lastSyncTime);
      } catch(e) {
          console.error("Sync Error: ", e);
      } finally {
          this.isBackgroundSyncing = false;
      }
  }
});

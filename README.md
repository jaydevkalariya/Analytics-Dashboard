# Analytics-Dashboard
<pre>
a) sign-up and login sysytem ,
b) Ask a set of Questions by admin.
c) User can able to give Quiz and they get their marks and able to see their analysis and download it.

files:
1) main.js 
   all main logic is in this file.if you want to run the program or to start the server, nodemon main.js.
   
2) registration_form.html ,admin_registration.html ,superadmin_registration.html
   this three files are registration pages of normal user,admin,superadmin respectively with validation.
   
3) validation.js
   this is validation file for registration pages.
   
4) login.html
   login page for all type of user.
   
5) admin_panel.ejs
   This is the admin panel page with functionality of adding three types of questions:
   i) range questions  (admin can set min and max range)
   ii) True-False questions  ( admin can set true false options with their marks )
   iii) multiple Question questions ( admin can able to set their options as many as he wants )
   admin can able to delete the question.
   superadmin can able to delete the question from permanent database.
   
6) confirm_admin.html
   in this filr,after login,admin can able to select anyone of the options:
   i) preview of the quiz
   ii) new quiz
   iii) modify quiz
   
6) Welcome.ejs
   this is the home page of user with functionality of giving quiz,showing marks,showing analysis.
   
7) quiz.ejs ,quiz2.ejs
   quiz.ejs file is for user.he can able to see questions which is set by the admin with the buttons submit and back to home.
   user get 30 minute to complete the quiz.
   quiz2.ejs file is for admin preview purpose only.admin can able to see question set by him/her.
   
8)contact.ejs,contact2.ejs
   this are the contact pages for admin and users.if any query arises,he/she can able to do mail directly from this page.
   
9)Score.ejs
   this page shows the marks outof total marks.
   
10)Analysis.ejs
   after giving quiz,this page shows the analysis of user.which contain their name,email id,time,date,score with comparision of thier marks with average marks,
   maximum percentage.
   
</pre>

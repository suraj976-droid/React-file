Note: Fetching and updating Code is incomplete

Flow 1:

React Component (test.jsx):
useState Hook:

formData aur users ke liye 2 state variables banaye gaye hain. formData input fields ka data store karega, aur users users ka data store karega jo database se aayega.
handleChange Function:

Jab koi input field (username, password, address) change hoti hai, to yeh function call hota hai. Yeh jo bhi change hota hai, usko state me save karta hai. name attribute se field ko identify kiya jata hai.
fetchUsers Function:

Jab page load hota hai, to yeh function users ka data fetch karne ke liye API call karta hai (http://localhost:8081/getdata). Agar sab sahi hota hai, to users ka data set ho jata hai.
useEffect Hook:

Page ke initial render pe, useEffect call hota hai aur fetchUsers function ko call karta hai taaki users ka data fetch ho sake. Yeh bas ek baar call hota hai.
handleSubmit Function:

Form submit karte waqt yeh function trigger hota hai. Sabse pehle, window confirmation message aata hai (user se puchha jata hai ki kya wo data submit karna chahta hai).
Agar user "Yes" karta hai, to axios.put request ke through data backend me save hota hai (http://localhost:8081/putdata). Form submit hone ke baad page reload ho jata hai.
deleted Function:

Jab koi user ko delete karna hota hai, to yeh function use hota hai. axios.post request ke through id ke base pe user ko delete kar diya jata hai (http://localhost:8081/deletedata).
edit Function:

Agar kisi user ko edit karna ho, to yeh function specific user ka data fetch karta hai aur usko formData me set kar deta hai, taaki input fields pre-filled ho jayein (http://localhost:8081/requestdata/${id}).
Backend (index.js):
Express Setup:

Server express aur cors ko use karke banaya gaya hai. Yeh 8081 port pe run ho raha hai aur cross-origin requests allow karta hai (React app 3000 port pe chal rahi hai, isliye CORS allow karna zaroori hai).
MySQL Connection:

createPool ka use karke MySQL database se connection banaya gaya hai. Database ka naam 'mysociety' hai.
API Endpoints:

/getdata: Users ka data fetch karta hai jisme deleted column 0 hai (jo delete nahi kiye gaye hain).
/putdata: Naye user ko database me insert karta hai (username, password, address fields ke saath).
/deletedata: Specific user ko soft delete karta hai by setting deleted = 1.
/requestdata: Specific user ka data fetch karta hai edit karne ke liye.






Flow 2:
1. Table Listing (Read) – Fetching Users Data
Sabse pehle jab page load hota hai, useEffect hook trigger hota hai.
Iske andar fetchUsers function call hota hai, jo API (http://localhost:8081/getdata) se users ka data fetch karta hai aur users state me save karta hai.
Yeh data table me show hota hai, jaha har row me user ka username aur actions (delete, edit buttons) display hote hain.
Flow:

useEffect -> fetchUsers -> API call -> users table me show hota hai.
2. Insert Operation (Create) – Form Submission
Jab tum form bharte ho (username, password, address), aur submit button press karte ho, tab handleSubmit function trigger hota hai.
Yeh confirmation message dikhata hai, agar user "Yes" karta hai, to data backend me axios.put ke through insert hota hai (http://localhost:8081/putdata).
Data insert hone ke baad page reload hota hai taaki updated list dikh sake.
Flow:

Form filling -> handleSubmit -> Data insert API call -> Page reload -> Updated table listing.
3. Edit Operation (Update) – Fetch Data Based on ID
Jab tum edit button (pencil icon) pe click karte ho, edit function call hota hai.
Yeh specific user ka id backend ko send karta hai, jo API se us user ka data fetch karta hai (http://localhost:8081/requestdata/${id}).
Phir yeh fetched data formData me set hota hai taaki input fields me wo user ka data pre-filled ho jaye aur tum usko edit kar pao.
Flow:

Edit button click -> edit function -> Fetch user by ID -> Pre-fill form with fetched data.
4. Delete Operation (Delete) – Remove User
Jab tum delete button (trash icon) pe click karte ho, deleted function call hota hai.
Yeh user ka id backend ko send karta hai, jo user ko soft delete karta hai (http://localhost:8081/deletedata).
Delete hone ke baad page reload hota hai taaki updated list bina us user ke dikh sake.
Flow:

Delete button click -> deleted function -> Delete API call -> Page reload -> Updated table listing.

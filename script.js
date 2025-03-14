let name = document.querySelector('input');
let search = document.querySelector('button');
let profile = document.querySelector('#profile');

async function fetchGithub() {
    const username = name.value.trim();

    if(username == ""){
        profile.innerHTML = "Please type a name";
        return;
    }

    try{
        const response = await fetch(`https://api.github.com/users/${username}`);


        if(!response.ok){
            throw new Error("user not found")
        }

        const data  = await response.json();

        function displayProfile(data) {
            profile.innerHTML = `
                <div class="border p-4 mt-4 text-center rounded-lg bg-gray-800">
                    <img src="${data.avatar_url}" alt="Profile Picture" class="w-24 h-24 rounded-full mx-auto">
                    <h2 class="text-lg font-bold mt-2">${data.name || data.login}</h2>
                    <p class="text-sm text-gray-400">@${data.login}</p>
                    <p class="mt-2">${data.bio || "No bio available"}</p>
                    <p class="mt-2 text-blue-400"><a href="${data.html_url}" target="_blank">View Profile</a></p>
                </div>
            `;
        }

    }
    catch(error){
        profile.innerHTML = "${error.message}"
    }
   
}

search.addEventListener("click", fetchGithub);
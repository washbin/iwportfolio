const githubhandle = "washbin";

const image = document.getElementById("profileImage");
const handle = document.getElementById("handlename");
const status = document.getElementById("status");
const projectlist = document.getElementById("projectlist");
const followerInfo = document.getElementById("followerInfo");
const githubLink = document.getElementById("githubLink");

fetch(`https://api.github.com/users/${githubhandle}`)
  .then((res) => res.json())
  .then((res) => {
    image.src = res["avatar_url"];
    handle.textContent = res["name"];
    status.textContent = res["bio"];
    followerInfo.textContent = `I have been followed by ${res["followers"]} awesome people on github.`;
    githubLink.href = res["html_url"];

    fetch(`${res.repos_url}`)
      .then((data) => data.json())
      .then((data) => {
        data.forEach((elem) => {
          const item = document.createElement("li");
          item.innerHTML = `<a href="${elem.html_url}">${elem.name}</a>`;
          projectlist.appendChild(item);
        });

        document.getElementById("loading").hidden = true;
        document.getElementById("main").hidden = false;
      });
  });

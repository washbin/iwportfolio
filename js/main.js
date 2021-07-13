// const myrepos = [
//   { name: "noname", html_url: "#" },
//   { name: "somename", html_url: "#" },
// ];

const image = document.getElementById("profileImage");
const handle = document.getElementById("handlename");
const status = document.getElementById("status");
const projectlist = document.getElementById("projectlist");

const githubhandle = "washbin";

fetch(`https://api.github.com/users/${githubhandle}`)
  .then((res) => res.json())
  .then((res) => {
    image.src = res["avatar_url"];
    handle.innerText = res["name"];
    status.innerText = res["bio"];

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

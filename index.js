const url = 'https://gist.githubusercontent.com/rvsp/add40254aa126f045837fa5b51f47f1f/raw/4d724bfabf4cce7379a386e23bef6576ab99a2f9/pagination.json';

let currentPage = 1;
let previousPage = currentPage;
const dataContainer = document.getElementById("data-container");
const paginationContainer = document.getElementById("pagination");


const rowsPerPage = 5;


async function fetchData()
{
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayData(data, dataContainer, rowsPerPage, currentPage);
        showPagination(data, paginationContainer, rowsPerPage, currentPage);
        
    } catch (error) {
        console.log("Error in fetching the data: ", error);
    }
}


function displayData(items, container, rowsPerPage, page)
{
    container.innerHTML = "";
    if(page < 0 )
    {
        page =0;
    }
    else
    {

        page--;
    }
    
    const start = rowsPerPage * page;
    const end = start + rowsPerPage;
    const itemsToDisplay = items.slice(start, end);

    itemsToDisplay.forEach((item)=>{
        const itemDiv = document.createElement("div");
        itemDiv.textContent = item.name || " ";
        container.appendChild(itemDiv);
        })
}

function  showPagination(items, container, rowsPerPage, page)
{
    container.innerHTML  = "";
    let pageCount = Math.ceil(items.length / rowsPerPage);

    //Creating the firstButton
    const firstButtonData = {
        name: "First",
        pageNumber: 1
    };

    let firstBtn = paginationButton(1, items, true, firstButtonData);
    container.appendChild(firstBtn);
    //Creating a previousButton
    const previousButtonData = {
        name: "Previous",
        pageNumber: previousPage
    }
    let prevBtn = paginationButton(previousPage, items, true, previousButtonData);
    prevBtn.addEventListener('click',()=>{
        currentPage = previousPage;
        displayData(items, dataContainer, rowsPerPage, currentPage);
        // let currentButton  = document.querySelector('.pagination li.active');
        // currentButton.classList.remove('active');
        // prevBtn.classList.add('active');
    })
    container.appendChild(prevBtn);
    for(let i = 2; i< pageCount; i++)
    {
        let btn = paginationButton(i, items, undefined, undefined);
        container.appendChild(btn);
    }

}
function paginationButton(pageNumber, data, isSpecialButton, specialButtonData)
{
    const button = document.createElement('li');
    if(isSpecialButton){
        button.textContent = specialButtonData.name;
    }
    else
    {
        button.textContent = pageNumber;
    }
    
    if(currentPage == pageNumber)
    {
        button.classList.add('active');
    }

    button.addEventListener('click',()=>{
        previousPage = currentPage;
        currentPage = pageNumber;
        if(isSpecialButton)
        {
            displayData(data, dataContainer, rowsPerPage, specialButtonData.pageNumber);
        }
        else
        {
            displayData(data, dataContainer, rowsPerPage, currentPage);
        }
        

       

        let currentButton  = document.querySelector('.pagination li.active');
        currentButton.classList.remove('active');
        button.classList.add('active');
    });
    return button;
}

fetchData();
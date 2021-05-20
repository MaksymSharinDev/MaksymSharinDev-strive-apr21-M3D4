window.onload = () => {
    const fetchProducts = async function (obj) {
        await fetch('https://striveschool-api.herokuapp.com/books')
            .then(response => response.json())
            .then(data => obj['productFetchData'] = data)
    }
    const renderProducts = function (prodsRawArr , cartList ) {
        prodsRawArr.forEach(
            (el, i, a) => {
                    el['productID'] = `product${i}`
                    let prodCard = document.createElement('div')
                    let productsListingElem = $('#productsListing .row')[0]

                    productsListingElem.append(prodCard)

                    let cardHTML = `
                    <div class="col mb-4" >
                        <div class="card" id="${el['productID']}">
                        <img src=" ${el['img']} " class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">
                            ${el['title']}
                            </h5>
                            <div class="btnsCardContainer d-flex">
                            </div>
                            </div>
                        </div>
                    </div>`;
                    prodCard.outerHTML = cardHTML
                    let curProdCard = $(`#product${i}`)
                    let loadButton = loadButtons( curProdCard.children('.btnsCardContainer') , 4 )
                    loadButton.next({
                        content: "Add to Card",
                        clickCallback: (e) => {
                            let selectedCard = e.currentTarget.closest('.card')
                            selectedCard.style.backgroundColor = 'green'
                            cartList.push(el)}
                        })
                loadButton.next({
                    content: "Delete Card",
                    clickCallback: (e) => {}
                })
            }
        )
    }
    const loadButtons = function* (elem , n ) {
        for (i = 0; i < n; i++) {
            let btnElem = document.createElement('button')
            elem.append(btnElem)
            let properties = yield
            btnElem.outerHTML = `<button class="btn btn-primary" type="submit" >${properties.content}</button>`
            btnElem.addEventListener('click', properties.clickCallback )


        }
    }
    ;(async function Main() {
        let dataObj = {};
        let cartList = [];
        await fetchProducts(dataObj);
        console.log(dataObj,);
        renderProducts(dataObj.productFetchData, cartList)
        ;
    })()
}


/*
    const renderPage = function (dataObj) {
            const renderTemplates = function (templateRaw) {
                const Templater = function (templateText) {
                    return new Function(
                        "DataObj",
                        "let output="+
                        JSON.stringify(templateText)
                            .replace(/<%=(.+?)%>/g, '"+($1)+"')
                            .replace(/<%(.+?)%>/g, '";$1\noutput+="')
                        +";return output;"
                    );
                }
                // function that get template code and return parametrized template
                // that gonna be applied to parent innerHTML
                let render = Templater(templateRaw);
                return render(dataObj)
            }
            let templateRaw = $('[type="text/template"]')[0]
        console.log(
            templateRaw.textContent
        )
            templateRaw.outerHTML = renderTemplates( templateRaw.innerHTML )


        }
    <!--
    <script type="text/template" >
        <% for( let i = 0; DataObj.productFetchData.length; i++ ) %>
        <div class="col mb-4">
            <div class="card">
                <img src="<%= DataObj.productFetchData.img %>" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">
                        <%= DataObj.productFetchData.title %>
                    </h5>
                </div>
            </div>
        </div>
        <% } %>
    </script>
    -->
*/
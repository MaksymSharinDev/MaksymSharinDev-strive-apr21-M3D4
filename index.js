window.onload = () => {
    const fetchProducts = async function (obj) {
        await fetch('https://striveschool-api.herokuapp.com/books')
            .then(response => response.json())
            .then(data => obj['productFetchData'] = data)
    }
    const renderProducts = function (prodsRawArr = []) {
            prodsRawArr.forEach(
                (el, i, a) => {
                    let prodCard = document.createElement('div')
                    $('#productsListing .row')[0].append(prodCard)
                    prodCard.outerHTML = `
                    <div class="col mb-4">
                        <div class="card">
                        <img src=" ${el['img']} " class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">
                            ${el['title']}
                            </h5>
                            <div class="d-flex">
                                <button class="btn btn-primary" type="submit">Add to Card</button>
                                <button class="btn btn-primary" type="submit">Skip</button>
                                <button class="btn btn-primary" type="submit">Ignore</button>
                                <button class="btn btn-primary" type="submit">Delete</button>
                            </div>
                            </div>
                        </div>
                    </div>`
                    prodCard.querySelectorAll('btn')[0].addEventListener('click')
                    prodCard.querySelectorAll('btn')[1].addEventListener('click')
                    prodCard.querySelectorAll('btn')[2].addEventListener('click')
                    prodCard.querySelectorAll('btn')[3].addEventListener('click')

                }
            )
        }
    ;(async function Main() {
        let dataObj = {};
        await fetchProducts(dataObj);
        console.log(dataObj);
        renderProducts(dataObj.productFetchData);
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
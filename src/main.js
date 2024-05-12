console.log('hello world');

const grid_path = '.entity-list'
const list_path = '.item-list'
const item_path = '.item-card'

// 获取列表元素
let grid = document.querySelector(grid_path);
console.log(grid)
// 创建一个 MutationObserver 实例
let observer = new MutationObserver(function (mutationsList, observer) {
    // 遍历变化列表
    console.log('节点已加载');
    // 取消观察
    observer.disconnect();

    let list = document.querySelector(list_path);

    // 如果找到了列表元素
    if (list) {
        // 获取列表中的所有列表项
        let listItems = list.querySelectorAll(item_path);


        // 创建一个全选复选框
        var selectAllCheckbox = document.createElement('input');
        selectAllCheckbox.type = 'checkbox';
        selectAllCheckbox.addEventListener('change', function () {
            // 遍历每个列表项，设置复选框的选中状态
            listItems.forEach(function (item, index) {
                var checkbox = item.querySelector('input[type="checkbox"]');
                checkbox.checked = selectAllCheckbox.checked;
                // 打印选择框的序号
                if (checkbox.checked) {
                    console.log("Checkbox " + (index + 1) + " is checked.");
                }
            });
        });

        // 在列表之前插入全选复选框
        list.parentNode.insertBefore(selectAllCheckbox, list);

        // 遍历每个列表项
        listItems.forEach(function (item, index) {
            // 创建一个多选框元素
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

            // 将多选框添加到列表项中
            item.insertBefore(checkbox, item.firstChild);

            // 监听多选框的变化事件
            checkbox.addEventListener('change', function () {
                var allChecked = true;
                listItems.forEach(function (checkbox) {
                    if (!checkbox.checked) {
                        allChecked = false;
                    }
                });
                selectAllCheckbox.checked = allChecked;
                // 打印选择框的序号
                console.log("Checkbox " + (index + 1) + " is " + (checkbox.checked ? "checked" : "unchecked") + ".");
            });
        });
    }

    add_button(list)

    add_button_sort(list, 'year')
    add_button_sort(list, 'vote')
    add_button_sort(list, 'rate')

});

// 开始观察父节点的变化
observer.observe(grid, { childList: true });

// document.querySelector('.item-card').querySelector('span > span > a').classList.contains('activated')

function get_item_info(item) {
    let activated = item.querySelector('span > span > a').classList.contains('activated')
    let year = item.querySelector('div > div:nth-child(2) > hgroup > h5 > small').textContent.split('\n')[1].trim().slice(1, -1)
    let vote = item.querySelector("div > div:nth-child(2) > div > div.brief > div > span.solo-hidden > small").textContent.slice(1, -4)
    let rate = item.querySelector("div > div:nth-child(2) > div > div.brief > div > span.solo-hidden").textContent.split(' ')[0]
    return {
        activated,
        year: parseInt(year),
        vote: parseInt(vote),
        rate: parseFloat(rate),
    }
}

function add_button(list) {
    let div = document.createElement("div");
    let label = document.createElement("label");
    let btn = document.createElement("button");
    btn.innerHTML = "全部";//innerText也可以,区别是innerText不会解析html
    let btn_act = document.createElement("button");
    btn_act.innerHTML = "标记";//innerText也可以,区别是innerText不会解析html
    let btn_un = document.createElement("button");
    btn_un.innerHTML = "未标记";//innerText也可以,区别是innerText不会解析html

    btn.onclick = function () {
        let i = 0;
        let listItems = list.querySelectorAll(item_path).forEach(
            item => {
                item.style.display = 'block'; // 显示未激活的项目
                i++;
            }
        )
        label.innerHTML = i
    }

    btn_un.onclick = function () {
        let i = 0;
        let listItems = list.querySelectorAll(item_path).forEach(
            item => {
                // if (item.querySelector('input').checked) {
                    let { activated } = get_item_info(item)
                    if (activated) {
                        item.style.display = 'none'; // 隐藏已激活的项目
                    } else {
                        item.style.display = 'block'; // 显示未激活的项目
                        i++
                    }
                // }
            }
        )
        label.innerHTML = i
    }
    btn_act.onclick = function () {
        let i = 0
        let listItems = list.querySelectorAll(item_path).forEach(
            item => {
                // if (item.querySelector('input').checked) {
                    let { activated } = get_item_info(item)
                    if (activated) {
                        item.style.display = 'block'; // 显示未激活的项目    
                        i++;
                    } else {
                        item.style.display = 'none'; // 隐藏已激活的项目
                    }
                // }
            }
        )
        label.innerHTML = i
    }

    div.append(label, btn, btn_act, btn_un)

    // 在列表之前插入全选复选框
    list.parentNode.insertBefore(div, list);
}

function add_button_sort(list, key) {
    let btn_sort = document.createElement("label");

    let btn_sort_asc = document.createElement("button");
    let btn_sort_desc = document.createElement("button");

    btn_sort.innerHTML = key
    btn_sort_asc.innerHTML = "▲∆";//innerText也可以,区别是innerText不会解析html △▽
    btn_sort_desc.innerHTML = "▼∇";

    btn_sort_asc.onclick = function () {
        let listItems = list.querySelectorAll(item_path)
        reorderItems(list, listItems, key, 1)
    }
    btn_sort_desc.onclick = function () {
        let listItems = list.querySelectorAll(item_path)
        reorderItems(list, listItems, key, -1)
    }

    btn_sort.append(btn_sort_asc, btn_sort_desc)

    // 在列表之前插入全选复选框
    list.parentNode.insertBefore(btn_sort, list);
}

function reorderItems(container, listItems, key, type) {
    var items = Array.from(listItems);

    // 根据 data-order 属性排序项目
    items.sort(function (a, b) {
        let orderA = get_item_info(a)
        var orderB = get_item_info(b)
        return (orderA[key] - orderB[key]) * type;
    });

    // 清空容器
    container.innerHTML = '';

    // 重新插入排序后的项目到容器中
    items.forEach(function (item) {
        container.appendChild(item);
    });
}













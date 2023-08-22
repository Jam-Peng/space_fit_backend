/* eslint-disable react/prop-types */
import { IoMdClose } from "react-icons/io";
import { useContext } from "react"
import { CourseContext } from "../../contexts/CourseContext"

function CourseModel({ currentUser }) {
  const { openModel, isNew, isChecked, isDisabled, setIsDisabled, previewImages, setPreviewImages, handleClose,
    formData, setFormData, hasPhoto, setHasPhoto, handleCheckBox, isFileImg, setIsFileImg, addCourseAPI, updateCourseAPI,
    } = useContext(CourseContext)
  
  // 轉換照片的格式並存到 formData和即時預覽
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (files) {
      setIsFileImg(false)
      
      const imageFiles = Array.from(files);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: imageFiles,
      }));
      // 判斷新增時是否有照片
      if (e.target.files.length > 0) {
        setHasPhoto(true);
        setIsDisabled(false)
      }
      
      // 即時預覽選擇的圖片
      const imagePreviews = imageFiles.map((file) => ({
        file,
        preview:URL.createObjectURL(file)
      }));
      setPreviewImages(imagePreviews);
    }else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  }

  // 刪除預覽的圖片
  const removeImage = (index) => {
    setPreviewImages((prevPreviewImages) => {
      const newPreviewImages = [...prevPreviewImages];
      newPreviewImages.splice(index, 1);
      return newPreviewImages;
    });
  };

  // 新增或更新課程到資料庫
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 創建 FormData 物件來傳送表單資料，包含圖片
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('class_amount', formData.class_amount);
    data.append('teacher', formData.teacher);
    data.append('open_amount', formData.open_amount);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('open_class_date', formData.open_class_date);
    data.append('complete', formData.complete);

    // 將預覽圖片的檔案加入 FormData 中
    formData.images.forEach((image) => {
      if (typeof (image['name']) !== "string") return
      data.append('images', image, `${image.name}`);
    });

    // 新增或更新課程API執行
    if (isNew) {
      addCourseAPI(currentUser, data)
    } else {
      updateCourseAPI(currentUser, data)
    }

    // 清空表單資料和預覽圖片
    setFormData({
      title: '',
      category: '',
      teacher: '',
      class_amount: '',
      open_amount: '',
      price: '',
      description: '',
      open_class_date: '',
      complete: false,
      images: [],
    });
    setPreviewImages([]);
  }


  return (
    <section className={`${openModel ? 'right-0' : '-right-full'} bg-stone-50 top-0 absolute shadow-lg 
      md:w-[25vw] xl:max-w-[30vw] min-h-full transition-all duration-500 z-30 px-4 lg:px=[35px]`}>
      <div>
        <div className='flex items-center justify-between py-4 border-b border rounded-md bg-emerald-500 px-2 mt-2.5'>
          <span className='text-slate-50 tracking-wide'>{ isNew ? '新增課程' : '更新課程' }</span>
          <div onClick={handleClose}
            className="flex border rounded-md p-0.5 bg-rose-500 text-slate-200  hover:bg-slate-500/30 hover:text-rose-500">
            <button> <IoMdClose size={20} /> </button>
          </div>
        </div>

        <form action="" className="space-y-1" onSubmit={ handleSubmit }>
          {/* 課程資料 */}
          <div className="space-y-2 py-2 border-b-2">
            <div className="flex items-center justify-between">
              <div className="pt-1">
                <label htmlFor="title">名稱</label>
                <input type="text" id="title" name="title"
                  value={ formData.title }           
                  onChange={ handleChange }
                  className="block w-full rounded-md border-0 py-1 px-3 text-slate-900 shadow-sm ring-1 ring-inset
                  ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-emerald-500
                  sm:text-sm sm:leading-6"
                  required
                />
              </div>
              <div className="pt-1">
                <label htmlFor="open_class_date">開課日期</label>
                <input type="datetime-local" id="open_class_date" name="open_class_date"
                  value={ formData.open_class_date}           
                  onChange={ handleChange }
                  className="block w-full rounded-md border-0 py-1 px-3 text-slate-900 shadow-sm ring-1 ring-inset
                  ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-emerald-500
                  sm:text-sm sm:leading-6"
                />
              </div>
              
            </div>
            

            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="category">類型</label>
                <input type="text" id="category" name="category"
                  value={ formData.category }
                  onChange={ handleChange }
                  className="block w-full rounded-md border-0 py-1 px-3 text-slate-900 shadow-sm ring-1 ring-inset
                  ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-emerald-500
                  sm:text-sm sm:leading-6"
                  required
                />
              </div>
              <div>
                <label htmlFor="teacher">教練</label>
                <input type="text" id="teacher" name="teacher"
                  value={ formData.teacher }
                  onChange={ handleChange }
                  className="block w-full rounded-md border-0 py-1 px-3 text-slate-900 shadow-sm ring-1 ring-inset
                  ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-emerald-500
                  sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="class_amount">課程</label>
                <input type="text" id="class_amount" name="class_amount"
                  value={ formData.class_amount }
                  onChange={ handleChange }
                  placeholder="課堂數"
                  className="block w-full rounded-md border-0 py-1 px-3 text-slate-900 shadow-sm ring-1 ring-inset
                  ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-emerald-500
                  sm:text-sm sm:leading-6"
                  required
                />
              </div>
              <div>
                <label htmlFor="open_amount">開課人數</label>
                <input type="text" id="open_amount" name="open_amount"
                  value={ formData.open_amount }
                  onChange={ handleChange }
                  className="block w-full rounded-md border-0 py-1 px-3 text-slate-900 shadow-sm ring-1 ring-inset
                  ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-emerald-500
                  sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="price">售價</label>
                <input type="number" id="price" name="price"
                  value={ formData.price }
                  onChange={ handleChange }
                  className="block w-full rounded-md border-0 py-1 px-3 text-slate-900 shadow-sm ring-1 ring-inset
                  ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-emerald-500
                  sm:text-sm sm:leading-6"
                  required
                />
              </div>
              {isNew ? null:
                <div className="grid grid-rows-2  gap-1 mx-auto">
                  <label htmlFor="complete">是否開課</label>
                  <input type="checkbox" id="complete" name="complete"
                    value={ formData.complete }
                    onChange={ handleCheckBox }
                    className="h-5"
                    checked={ isChecked }
                  />
                </div>
              }
            </div>
            <div>
              <label htmlFor="description">介紹</label>
              <textarea name="description" id="description" rows="4" type="text"
                value={ formData.description }
                onChange={ handleChange }
                className="block w-full rounded-md border-0 py-1 px-3 text-base text-slate-900 shadow-sm ring-1 ring-inset
                ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-emerald-500
                sm:text-sm sm:leading-6"
                >
              </textarea>
            </div>
          </div>
          
          <div>
            {/* 上傳圖片 */}
            <div className="space-y-1.5">
              <div className="space-y-1 ">
                <label className="text-lg text-slate-900" htmlFor="images">上傳圖片</label>
                <input className="upload_img_input"
                  id="images" type="file" name="images" accept="image/*" value='' multiple
                  onChange={ handleChange } /> 
              </div>
              {/* 圖片渲染 */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[24px] mx-auto h-[150px] overflow-y-auto">
                { isFileImg ?
                  previewImages.map((itemImg, index) => (
                    <div className="space-y-2" key={index}>
                      <div className="h-25">
                        <div className=" h-full">
                          <div className="w-25">
                            <img className="rounded-lg" src={`data:image/png;base64,${itemImg['image_path']}`} alt="預覽圖片" />
                          </div>
                        </div>
                      </div>
                      <input type="button" value="刪除"
                        className="btn btn-delete text-base cursor-pointer"
                        onClick={() => removeImage(index)} />
                    </div>
                  ))
                :
                  previewImages.map((itemImg, index) => (
                    <div className="space-y-2" key={index}>
                      <div className="h-25">
                        <div className=" h-full">
                          <div className="w-25">
                            <img className="rounded-lg" src={itemImg.preview} alt="預覽圖片" />
                          </div>
                        </div>
                      </div>
                      <input type="button" value="刪除"
                        className="btn btn-delete text-base cursor-pointer"
                        onClick={() => removeImage(index)} />
                    </div>
                  ))
                }
              </div>
            </div> 
          </div>
          <div>
            <button type="submit" disabled={isDisabled}
              className="flex w-full justify-center rounded-md bg-emerald-500 px-3 py-1.5 text-sm 
              font-semibold leading-6 text-gray-50 shadow-sm hover:bg-emerald-400 hover:text-gray-100
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-emerald-500">
              { hasPhoto ? (isNew? "新增": "更新") : "請先選擇照片"}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CourseModel
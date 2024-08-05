import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { DEFAPIKEY } from "./apikey.js";

const { API_KEY, options, FIREBASECONFIG, BASEURL } = DEFAPIKEY;

// Firebase 초기화
const app = initializeApp(FIREBASECONFIG);
const db = getFirestore(app);

// 영화 ID를 URL 쿼리 파라미터에서 가져오기
const MOVIEID = new URLSearchParams(window.location.search).get('id');

// HTML 요소 가져오기
const elements = {
  submitReviewButton: document.getElementById("submit_review"),
  reviewsContainer: document.getElementById("reviews"),
  reviewAuthor: document.getElementById("review_author"),
  reviewPassword: document.getElementById("review_password"),
  reviewContent: document.getElementById("review_content")
};

// 리뷰 작성자 이름을 마스킹 처리하는 함수
const maskName = (name) => {
    if (name.length <= 2) {
        return name[0] + '*';
    } else if (name.length === 3) {
        return name[0] + '*' + name[2];
    } else {
        return name[0] + '*'.repeat(name.length - 2) + name[name.length - 1];
    }
};

// 리뷰 폼 제출 처리
const submitReview = async (event) => {
  event.preventDefault();

  const user = elements.reviewAuthor.value;
  const password = elements.reviewPassword.value;
  const reviewContent = elements.reviewContent.value;

  // 입력 필드가 비어 있는지 확인
  if (!user || !password || !reviewContent) {
    Swal.fire({
      icon: 'warning',
      title: '모든 필드를 채워주세요!',
      text: '작성자, 비밀번호, 평가 내용을 입력해주세요.',
      confirmButtonText: '확인'
    });
    return;
  }

  try {
    await addDoc(collection(db, "reviews"), { movieId: MOVIEID, user, password, reviewContent });
    
    Swal.fire({
      position: "center",
      icon: "success",
      title: "리뷰가 등록되었습니다.",
      showConfirmButton: false,
      timer: 1500
    });

    fetchReviews();
  } catch (e) {
    console.error("리뷰 등록 중 오류 발생:", e);
    alert("리뷰 등록 중 오류 발생: " + e);
  }
};

// 리뷰를 HTML로 변환
const createReviewElement = (data, reviewId) => {
  const reviewElement = document.createElement("div");
  reviewElement.classList.add("review_item");
  reviewElement.innerHTML = `
    <div class="review_author">${maskName(data.user)}</div>
    <div class="review_content">${data.reviewContent}</div>
    <button class="edit_review" data-id="${reviewId}">수정</button>
    <button class="delete_review" data-id="${reviewId}">삭제</button>
  `;
  return reviewElement;
};

// 리뷰 목록 업데이트
const updateReviews = (querySnapshot) => {
  elements.reviewsContainer.innerHTML = ""; // 기존 리뷰 내용 삭제
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const reviewId = doc.id;
    elements.reviewsContainer.appendChild(createReviewElement(data, reviewId));
  });

  attachReviewEventListeners();
};

// 리뷰 이벤트 리스너
const attachReviewEventListeners = () => {
  elements.reviewsContainer.querySelectorAll(".edit_review").forEach(button => {
    button.addEventListener("click", async (event) => {
      const reviewId = event.target.getAttribute("data-id");
      Swal.fire({
        title: '수정할 리뷰 내용을 입력하세요:',
        input: 'textarea',
        inputValue: event.target.parentElement.querySelector('.review_content').innerText,
        showCancelButton: true,
        confirmButtonText: '수정',
        showLoaderOnConfirm: true,
        preConfirm: async (newContent) => {
          try {
            const reviewDoc = doc(db, "reviews", reviewId);
            const reviewSnapshot = await getDocs(query(collection(db, "reviews"), where("__name__", "==", reviewId)));
            const reviewData = reviewSnapshot.docs[0].data();

            const { value: password } = await Swal.fire({
              title: '비밀번호를 입력하세요:',
              input: 'password',
              inputAttributes: {
                autocapitalize: 'off',
                required: true
              },
              showCancelButton: true,
              confirmButtonText: '확인',
            });

            if (password === reviewData.password) {
              await updateDoc(reviewDoc, { reviewContent: newContent });
              
              Swal.fire({
                position: "center",
                icon: "success",
                title: "리뷰가 수정되었습니다.",
                showConfirmButton: false,
                timer: 1500
              });

              fetchReviews();
            } else {
              Swal.fire({
                icon: 'error',
                title: '비밀번호가 일치하지 않습니다.',
                confirmButtonText: '확인'
              });
            }
          } catch (e) {
            console.error("리뷰 수정 중 오류 발생:", e);
            Swal.fire({
              icon: 'error',
              title: '리뷰 수정 중 오류 발생',
              text: e.toString(),
              confirmButtonText: '확인'
            });
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      });
    });
  });

  elements.reviewsContainer.querySelectorAll(".delete_review").forEach(button => {
    button.addEventListener("click", async (event) => {
      const reviewId = event.target.getAttribute("data-id");
      const password = await Swal.fire({
        title: '비밀번호를 입력하세요:',
        input: 'password',
        inputAttributes: {
          autocapitalize: 'off',
          required: true
        },
        showCancelButton: true,
        confirmButtonText: '확인',
      });

      if (!password.value) return;

      try {
        const reviewDoc = doc(db, "reviews", reviewId);
        const reviewSnapshot = await getDocs(query(collection(db, "reviews"), where("__name__", "==", reviewId)));
        const reviewData = reviewSnapshot.docs[0].data();

        if (password.value === reviewData.password) {
          const result = await Swal.fire({
            title: '정말로 이 리뷰를 삭제하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소'
          });

          if (result.isConfirmed) {
            await deleteDoc(reviewDoc);
            
            Swal.fire({
              position: "center",
              icon: "success",
              title: "리뷰가 삭제되었습니다.",
              showConfirmButton: false,
              timer: 1500
            });

            fetchReviews();
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: '비밀번호가 일치하지 않습니다.',
            confirmButtonText: '확인'
          });
        }
      } catch (e) {
        console.error("리뷰 삭제 중 오류 발생:", e);
        Swal.fire({
          icon: 'error',
          title: '리뷰 삭제 중 오류 발생',
          text: e.toString(),
          confirmButtonText: '확인'
        });
      }
    });
  });
};

// 리뷰 가져오기
const fetchReviews = async () => {
  try {
    const q = query(collection(db, "reviews"), where("movieId", "==", MOVIEID));
    const querySnapshot = await getDocs(q);
    updateReviews(querySnapshot);
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

// 초기화 함수
const init = () => {
  elements.submitReviewButton.addEventListener("click", submitReview);
  fetchReviews();
};

document.addEventListener("DOMContentLoaded", init);
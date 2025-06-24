# 마크다운 테스트 문서

이 문서는 다양한 마크다운 요소들을 테스트하기 위한 샘플 파일입니다.

## 텍스트 스타일링

**굵은 글씨** 와 _기울임 글씨_ 그리고 ~~취소선~~을 사용할 수 있습니다.

`인라인 코드`도 표시할 수 있습니다.

## 리스트

### 순서 없는 리스트

- 첫 번째 항목
- 두 번째 항목
  - 중첩된 항목 1
  - 중첩된 항목 2
- 세 번째 항목

### 순서 있는 리스트

1. 첫 번째 단계
2. 두 번째 단계
3. 세 번째 단계

## 코드 블록

```javascript
// JavaScript 예제
function greetUser(name) {
  console.log(`안녕하세요, ${name}님!`);
  return `환영합니다!`;
}

const user = "개발자";
greetUser(user);
```

```python
# Python 예제
def calculate_sum(numbers):
    """숫자 리스트의 합을 계산합니다."""
    return sum(numbers)

my_numbers = [1, 2, 3, 4, 5]
result = calculate_sum(my_numbers)
print(f"합계: {result}")
```

## 인용문

> 이것은 인용문입니다.
>
> 여러 줄에 걸쳐 작성할 수 있습니다.
>
> > 중첩된 인용문도 가능합니다.

## 링크와 이미지

[Next.js 공식 문서](https://nextjs.org/docs)

## 테이블

| 이름   | 나이 | 직업     |
| ------ | ---- | -------- |
| 김철수 | 30   | 개발자   |
| 이영희 | 25   | 디자이너 |
| 박민수 | 35   | 기획자   |

## 체크리스트

- [x] 완료된 작업
- [x] 또 다른 완료된 작업
- [ ] 진행 중인 작업
- [ ] 아직 시작하지 않은 작업

## 구분선

---

## 소제목들

### H3 제목

#### H4 제목

##### H5 제목

###### H6 제목

## 특수 문자와 이모지

GitHub에서 지원하는 이모지: :rocket: :tada: :fire:

수학 기호: α β γ δ ε

## 긴 텍스트 예제

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.

## 마지막 섹션

이 마크다운 파일을 통해 다양한 요소들이 올바르게 렌더링되는지 확인할 수 있습니다.

**테스트 완료!** ✅

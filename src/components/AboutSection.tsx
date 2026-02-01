export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="bg-[#f4f4f5] dark:bg-white/[0.04] scroll-mt-14"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-16 sm:py-24">
        <h2
          id="about-title"
          className="text-xl font-bold tracking-tight mb-6 pb-2 border-b border-black/10 dark:border-white/10"
        >
          Introduce
        </h2>

        <div className="space-y-6 text-base text-black/70 dark:text-white/70 leading-relaxed">
          <p>
            안드로이드 개발자로서 1년간 실무 경험을 쌓으며 Kotlin, Jetpack Compose, MVVM, Clean Architecture 기반의 안정적인 앱 개발에 집중해왔습니다. 의료 솔루션, 급식 관리, 커피 주문 앱 등 다양한 도메인의 서비스를 개발하며 실사용자를 위한 완성도 높은 결과물을 만들어왔습니다.
          </p>
          <p>
            현대오토에버 모빌리티 SW스쿨에서 Android뿐 아니라 iOS, React, Spring Boot까지 전 주기 개발 흐름을 경험했습니다. 4개의 팀 프로젝트를 수행하며 API 설계, 데이터 흐름, 협업 방식을 실전처럼 운영했고, 이 과정에서 서비스 전체를 이해하는 시야를 키웠습니다.
          </p>
          <p>
            사용자 친화적인 UI·UX를 고민하고 개선하는 것을 가장 중요한 가치로 삼습니다. 문제를 마주했을 때 끝까지 파고드는 집요함과 팀원들과의 원활한 커뮤니케이션을 강점으로, 함께 성장하는 개발자가 되고자 합니다.
          </p>
        </div>
      </div>
    </section>
  );
}

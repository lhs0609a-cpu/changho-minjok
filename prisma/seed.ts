import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 시드 데이터 생성 시작...");

  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@changho-minjok.co.kr" },
    update: {},
    create: {
      email: "admin@changho-minjok.co.kr",
      password: hashedPassword,
      name: "관리자",
      role: "ADMIN",
    },
  });

  console.log("✅ 관리자 계정 생성:", admin.email);

  const products = [
    {
      slug: "pvc",
      name: "PVC창호",
      category: "프레임",
      description: "가성비 좋은 기본형 창호. 단열성과 기밀성이 우수합니다.",
      features: "우수한 단열성,합리적인 가격,다양한 디자인",
      priceMin: 150000,
      priceMax: 250000,
    },
    {
      slug: "hisash",
      name: "하이샤시",
      category: "프레임",
      description: "PVC보다 강화된 프레임으로 내구성이 뛰어납니다.",
      features: "강화된 내구성,슬림한 프레임,고급스러운 외관",
      priceMin: 200000,
      priceMax: 320000,
    },
    {
      slug: "system",
      name: "시스템창호",
      category: "프레임",
      description: "독일식 고급 창호. 최상의 단열과 방음 성능을 제공합니다.",
      features: "최고 단열성능,뛰어난 방음,프리미엄 품질",
      priceMin: 280000,
      priceMax: 450000,
    },
    {
      slug: "aluminum",
      name: "알루미늄",
      category: "프레임",
      description: "상업용, 대형 창호에 적합. 넓은 개구부 확보 가능.",
      features: "대형 창호 가능,높은 강성,현대적 디자인",
      priceMin: 180000,
      priceMax: 300000,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log("✅ 제품 데이터 생성 완료");

  const priceTableData = [
    { frameType: "PVC", glassType: "복층유리", windowType: "거실", pricePerSqm: 180000 },
    { frameType: "PVC", glassType: "복층유리", windowType: "방", pricePerSqm: 150000 },
    { frameType: "PVC", glassType: "삼중유리", windowType: "거실", pricePerSqm: 240000 },
    { frameType: "하이샤시", glassType: "복층유리", windowType: "거실", pricePerSqm: 240000 },
    { frameType: "시스템창호", glassType: "삼중유리", windowType: "거실", pricePerSqm: 420000 },
    { frameType: "시스템창호", glassType: "로이유리", windowType: "거실", pricePerSqm: 480000 },
  ];

  for (const price of priceTableData) {
    await prisma.priceTable.upsert({
      where: {
        frameType_glassType_windowType: {
          frameType: price.frameType,
          glassType: price.glassType,
          windowType: price.windowType,
        },
      },
      update: price,
      create: price,
    });
  }

  console.log("✅ 가격표 데이터 생성 완료");

  const customers = [
    { name: "김철수", phone: "010-1234-5678", email: "kim@email.com", address: "서울시 강남구 삼성동", housingType: "아파트", source: "웹사이트" },
    { name: "이영희", phone: "010-2345-6789", email: "lee@email.com", address: "경기도 수원시 영통구", housingType: "단독주택", source: "소개" },
    { name: "박민수", phone: "010-3456-7890", email: "park@email.com", address: "서울시 송파구 잠실동", housingType: "빌라", source: "웹사이트" },
  ];

  for (const customer of customers) {
    await prisma.customer.upsert({
      where: { phone: customer.phone },
      update: customer,
      create: customer,
    });
  }

  console.log("✅ 샘플 고객 데이터 생성 완료");

  const reviews = [
    { customerName: "김OO", content: "시스템창호로 교체하고 난방비가 30% 줄었어요!", rating: 5, housingType: "아파트", product: "시스템창호", isPublic: true },
    { customerName: "이OO", content: "상담부터 시공까지 정말 친절하셨어요.", rating: 5, housingType: "단독주택", product: "하이샤시", isPublic: true },
    { customerName: "박OO", content: "방음이 확실히 좋아졌어요!", rating: 4, housingType: "빌라", product: "시스템창호", isPublic: true },
  ];

  for (const review of reviews) {
    await prisma.review.create({ data: review });
  }

  console.log("✅ 샘플 후기 데이터 생성 완료");
  console.log("🎉 모든 시드 데이터 생성 완료!");
}

main()
  .catch((e) => {
    console.error("시드 데이터 생성 실패:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

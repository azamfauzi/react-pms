import { TransactionsWidget } from "@/components/widgets/transactions";
import { UpgradePlanWidget } from "@/components/widgets/upgrade-plan";
import { MeetingScheduleWidget } from "@/components/widgets/meeting-schedule";
import { TopCoursesWidget } from "@/components/widgets/top-courses";
import { UpcomingWebinarWidget } from "@/components/widgets/upcoming-webinar";
import { AssignmentProgressWidget } from "@/components/widgets/assignment-progress";
import { PopularInstructorsWidget } from "@/components/widgets/popular-instructors";
import { OrdersByCountriesWidget } from "@/components/widgets/orders-by-countries";
import { DeliveryPerformanceWidget } from "@/components/widgets/delivery-performance";
import { TeamMembersWidget } from "@/components/widgets/team-members";
import { DepositWidget } from "@/components/widgets/deposit";
import { WithdrawWidget } from "@/components/widgets/withdraw";
import { TotalEarningWidget } from "@/components/widgets/total-earning";
import { FinanceSummaryWidget } from "@/components/widgets/finance-summary";
import { AnalyticsWidget } from "@/components/widgets/analytics";
import { WebsiteStatisticsWidget } from "@/components/widgets/website-statistics";
import { DeveloperMeetupWidget } from "@/components/widgets/developer-meetup";
import { SalesByCountriesWidget } from "@/components/widgets/sales-by-countries";
import { ActivityTimelineWidget } from "@/components/widgets/activity-timeline";
import { CafeBadilicoWidget } from "@/components/widgets/cafe-badilico";

export default function AdvancedWidgetsPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TransactionsWidget />
        <UpgradePlanWidget />
        <MeetingScheduleWidget />

        <TopCoursesWidget />
        <UpcomingWebinarWidget />
        <AssignmentProgressWidget />

        <PopularInstructorsWidget />
        <OrdersByCountriesWidget />
        <DeliveryPerformanceWidget />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
        <TeamMembersWidget />
        <DepositWidget />
        <WithdrawWidget />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <TotalEarningWidget />
        <FinanceSummaryWidget />
        <AnalyticsWidget />

        <WebsiteStatisticsWidget />
        <DeveloperMeetupWidget />
        <SalesByCountriesWidget />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ActivityTimelineWidget />
        <CafeBadilicoWidget />
      </div>
    </div>
  );
}

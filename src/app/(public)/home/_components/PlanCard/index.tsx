export interface Plan {
  id: string;
  name: string;
  price: number;
  frequency: string;
  moneyType?: string;
  features: string[];
  observations?: string;
}

interface PlanCardProps {
  plans: Plan[];
}

export default function PlanCard({ plans }: PlanCardProps) {
  return plans.map((plan) => (
    <div
      className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8"
      key={plan.id}
    >
      <h5 className="mb-4 text-xl font-medium text-gray-500">{plan.name}</h5>

      <div className="flex items-baseline text-gray-900">
        <span className="text-3xl font-semibold">{plan.moneyType || "$"}</span>
        <span className="text-5xl font-extrabold tracking-tight">
          {plan.price}
        </span>
        <span className="ms-1 text-xl font-normal text-gray-500">
          /{plan.frequency}
        </span>
      </div>

      <ul role="list" className="space-y-5 w-full mt-7">
        {plan.features.map((feature, index) => (
          <li className="flex items-center" key={index}>
            <svg
              className="shrink-0 w-4 h-4 text-blue-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 ms-3">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {plan.observations && (
        <p className="text-sm text-gray-500 italic my-7">{plan.observations}</p>
      )}

      <a
        href={`/checkout?plan=${plan.id}`}
        className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
      >
        Escolher plano
      </a>
    </div>
  ));
}

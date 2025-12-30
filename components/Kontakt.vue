<template>
  <section class="container">
    <div class="content flex flex-col">
      <div v-if="loading" class="my-auto">
        <p class="mx-auto py-16 text-center text-[2rem] tracking-wide">Šaljemo mail, hvala Vam na povjerenju</p>
        <div class="loading mx-auto flex items-center justify-center">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div v-else-if="success" class="my-auto">
        <p class="mx-auto py-6 text-center text-[2rem] tracking-wide">Mail je poslan, hvala Vam na povjerenju</p>
        <div class="mx-auto pb-10 flex items-center justify-center">
          <MdiIcon icon="mdiCheckCircleOutline" class="text-primary h-14 w-14" />
        </div>
        <NuxtLink to="/" class="button-primary flex flex-row w-fit justify-start items-center mt-4 mx-auto">
          <p class="group relative w-max flex flex-row items-start">
            <!-- Arrow: initially hidden and shifted left -->
            <Icon class="arrow transition-all duration-300 ml-2 w-8 h-8" name="meteor-icons:arrow-right-long" />
            <!-- Button text -->
            <span
              class="button-text px-auto py-auto text-[1rem] font-medium uppercase transition-transform duration-300 my-auto">
              Početna
            </span>
            <!-- Icon: will fade out on hover -->
            <Icon class="icon mx-auto my-auto ml-2 pl-2 transition-opacity duration-300 w-8 h-8"
              name="entypo:dot-single" />
          </p>
        </NuxtLink>
      </div>
      <div v-else class="py-24">
        <h1 class="text-[2rem] md:text-[2.5rem] text-project_black font-semibold">{{ $t('contact_page_title') }}</h1>
        <p class="text-project_black text-[1rem] mb-6 leading-relaxed">
          {{ $t('contact_page_intro') }}
        </p>
        <div class="py-10 w-full">
          <p class="text-[1.5rem] font-medium text-project_black mb-4">{{ $t('contact_page_topics_intro') }}</p>
          <div class="flex flex-wrap gap-3">
            <button v-for="(cat, index) in categories" :key="index" @click="selectTopic(cat)" :class="[
              'px-6 py-2 rounded-full border text-[1rem] font-base transition',
              selectedTopic === cat.value
                ? 'bg-primary text-pure_white'
                : 'bg-pure_white border-project_gray text-project_black hover:bg-light_primary'
            ]"
            aria-label="Select topic">
              {{ cat.label }}
            </button>
          </div>
        </div>
        <form @submit.prevent="submitForm" class="mt-8 space-y-6 py-4">
          <div class="flex flex-col md:flex-row md:items-end md:space-x-2">
            <span class="text-project_black text-[1rem] font-medium">{{ $t('contact_page_greeting') }}</span>
            <input type="text" v-model="formData.name" :placeholder="$t('contact_page_placeholder_name')"
              class="flex-grow p-2 border-b border-project_black focus:outline-none focus:border-primary bg-inherit" />
            <span class="hidden md:flex">,</span>
          </div>

          <div class="flex flex-col md:flex-row md:items-end md:space-x-2 space-y-2">
            <span class="text-project_black text-[1rem] font-medium">{{ $t('contact_page_job_title') }}</span>
            <input type="text" v-model="formData.jobTitle" :placeholder="$t('contact_page_placeholder_job')"
              class="flex-grow p-2 border-b border-project_black focus:outline-none focus:border-primary bg-inherit" />
            <span class="pt-2 md:pt-0">{{ $t('contact_page_company_connector') }}</span>
            <input type="text" v-model="formData.company" :placeholder="$t('contact_page_placeholder_company')"
              class="flex-grow p-2 border-b border-project_black focus:outline-none focus:border-primary bg-inherit" />
            <span class="hidden md:flex">.</span>
          </div>

          <!-- Email -->
          <div class="flex flex-col md:flex-row md:items-end md:space-x-2 space-y-2 relative">
            <span class="text-project_black text-[1rem] font-medium">{{ $t('contact_page_email_intro') }}</span>
            <input type="email" v-model="formData.email" :placeholder="$t('contact_page_placeholder_email')"
              class="flex-grow p-2 border-b focus:outline-none bg-inherit" :class="{
                'border-project_black focus:border-primary': isEmailValid || !formData.email,
                'border-red-500/90 focus:border-red-500/90': !isEmailValid && formData.email
              }" />
            <span v-if="!isEmailValid" class="text-red-500/90 text-[1rem] font-medium absolute right-0">{{ $t('contact_page_invalid_email') }}</span>

          </div>
          <div class="flex py-8">
            <button class="group flex flex-row w-fit uppercase mx-auto mt-4 py-3 px-6 my-auto rounded-[6.25rem]" aria-label="Submit contact form"
              :class="isFormValid && isEmailValid ? 'bg-project_black text-pure_white hover:bg-primary w-fit' : 'bg-project_gray text-project_black w-fit'"
              :disabled="!isFormValid || !isEmailValid" type="submit">
              <Icon class="arrow transition-all duration-300 ml-2 w-8 h-8" name="meteor-icons:arrow-right-long" />
              <span class="button-text px-auto py-auto my-auto">{{ $t('contact_page_button') }}</span>
              <Icon class="icon mx-auto my-auto ml-2 pl-2 transition-opacity duration-300 w-8 h-8"
                name="entypo:dot-single" />
            </button>
          </div>

        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const { t } = useI18n()
const loading = ref(false)
const success = ref(false)
const topics = [
  'Web Development',
  'Mobile Development',
  'Automated Testing',
  'Social Media Automation',
  'E-commerce Automation',
  'Sales Automation'
]
const categories = [
  { label: 'Web Development',           value: 'web_dev' },
  { label: 'Mobile Development',        value: 'mobile_dev' },
  { label: 'Automated Testing',         value: 'automated_testing' },
  { label: 'Social Media Automation',   value: 'social_media_auto' },
  { label: 'E-commerce Automation',     value: 'ecommerce_auto' },
  { label: 'Sales Automation',          value: 'sales_auto' },
]

const selectedTopic = ref(null);
const formData = ref({
  name: "",
  jobTitle: "",
  company: "",
  email: "",
})
const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(formData.value.email) || formData.value.email === ""
})
const selectTopic = (topic) => {
  selectedTopic.value = topic.value;
}
// Computed property for validation
const isFormValid = computed(() => {
  return (
    formData.value.name.trim() !== "" &&
    formData.value.jobTitle.trim() !== "" &&
    formData.value.company.trim() !== "" &&
    formData.value.email.trim() !== "" &&
    selectedTopic.value !== null
  )
})

const submitForm = async () => {
  loading.value = true
  if (!isFormValid.value) return

  try {
    const response = await $fetch('/api/submit-lead', {
      method: 'POST',
      body: {
        full_name: formData.value.name,
        position: formData.value.jobTitle,
        company_name: formData.value.company,
        email: formData.value.email,
        category: selectedTopic.value,
      },
    })

    loading.value = false
    success.value = true
  } catch (error: any) {
    loading.value = false
    console.error("Form submission error:", error)

    // Better error handling - could be enhanced with proper UI messages
    const errorMessage = error?.data?.statusMessage || 'An error occurred. Please try again.'
    alert(errorMessage)
  }
}

</script>
<style scoped>
.loading span {
  width: 15px;
  height: 15px;
  margin: 0 5px;
  background-color: #0A21C0;
  border-radius: 50%;
  display: inline-block;
  animation-name: jumpingDots;
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.loading span:nth-child(2) {
  animation-delay: 0.3s
}

.loading span:nth-child(3) {
  animation-delay: 0.6s
}

@keyframes jumpingDots {
  20% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-13px)
  }
}

.arrow {
  opacity: 0;
  transform: translateX(-8px);
  /* Adjust offset as needed */
  transition: transform 0.3s ease, opacity 0.3s ease;
}

/* Icon: initially visible */
.icon {
  opacity: 1;
  transition: opacity 0.3s ease;
}

/* Button text: initially in place */
.button-text {
  transform: translateX(0);
  transition: transform 0.3s ease;
}

/* Hover state: reveal arrow, move text right, and fade out the icon */
.group:hover .arrow {
  opacity: 1;
  transform: translateX(0);
}

.group:hover .button-text {
  transform: translateX(16px);
  /* Shifts text to the right; adjust value as needed */
}

.group:hover .icon {
  opacity: 0;
}
</style>